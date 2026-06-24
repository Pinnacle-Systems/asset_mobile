import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserRolesOnPageQuery } from "../../redux/service/user";
import { NavRef } from "../../config/NavigationRef";
import NavBar from "../../components/Navbar";
import CustomDrawer from "../../components/SideBar";
import tabs from "../../config/tabIndex";
import LoginScreen from "../../screens/Login";
import SiderBarTabs from "../../config/SidebarTabs";
import Splash from "../../screens/Splash";
import { Common_Context } from "../../contexts/Common_Context";
import { AllowedTabs_Filter } from "../../utils/AllowedPagesFiltering";
import NoAllocatedPage from "../../components/Common/NoAllocatedPage";

import { ThemeProvider } from "../../theme/ThemeProvider";

const Stack = createNativeStackNavigator();

export function AppProviders() {
  const [tempUser, setTempUser] = useState("");
  const [compcode, setcompcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("LOGIN");
  const [isAdmin, setisAdmin] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem("userName");
        var Id = JSON?.parse(storedUser);
        setisAdmin(Id?.isAdmin || 0);
        setcompcode(Id?.GCOMPCODE || "");
        setTempUser(Id?.roleId || "");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [currentRoute]);

  const userRoleId = useMemo(() => (tempUser?.split("@")[0]) + "@" + compcode, [compcode, tempUser]);
  const { data: rolesOnPage, isLoading } = useGetUserRolesOnPageQuery({ RoleId: userRoleId });

  const roles = rolesOnPage?.data || [];

  // Pages allowed for this user (by role). Falls back to all tab keys while loading or no roles assigned.
  const pages = roles?.length > 0
    ? roles.filter(role => role?.isdefault == true).map((data) => data?.link)
    : tabs.map(tab => tab.key);

  // Mirror of legacy AGF_MOBILE pattern:
  //   - Only LOGIN and SPLASH are excluded from the spread and appended manually.
  //   - DashBoard stays INSIDE the spread (never hardcoded separately).
  //   - When user has no roles, DashBoard's component is swapped to NoAllocatedPage.
  const hasRoles = rolesOnPage?.data?.length > 0;

  const filteredTabs = [
    ...((pages.length > 0 && isAdmin == 0)
      ? tabs
        .filter(tab => pages?.includes(tab?.key))
        .filter(tab => tab.name !== "LOGIN" && tab.name !== "SPLASH")
        .map(tab =>
          tab.name === "HOME" && !hasRoles && !isLoading && !loading
            ? { ...tab, component: NoAllocatedPage }
            : tab
        )
      : tabs.filter(tab => tab.name !== "LOGIN" && tab.name !== "SPLASH")),
    { name: "LOGIN", component: LoginScreen },
    { name: "SPLASH", component: Splash },
  ];

  const handleStateChange = useCallback((state) => {
    const current = state?.routes[state.index]?.name;
    setCurrentRoute(current);
  }, []);

  const filterSidebar = AllowedTabs_Filter({
    tabs: SiderBarTabs,
    allowedTabs: filteredTabs,
    tabsPath_key: "path",
    allowedTabspath_key: "name",
  });

  return (
    <ThemeProvider>
      <Common_Context.Provider value={{ page: rolesOnPage?.data || [], loading: isLoading || loading, admin: isAdmin }}>
        <NavigationContainer ref={NavRef} onStateChange={handleStateChange}>
          {currentRoute !== "LOGIN" && currentRoute !== "SPLASH" && (
            <NavBar openSidebar={SidebarOpen} setopenSidebar={setSidebarOpen} />
          )}

          <Stack.Navigator initialRouteName="SPLASH">
            {(isAdmin == 1 ? tabs : filteredTabs)?.map((item) => (
              <Stack.Screen
                key={item?.name}
                name={item?.name}
                component={item?.component}
                options={{ headerShown: false }}
              />
            ))}
          </Stack.Navigator>

          {currentRoute !== "LOGIN" && currentRoute !== "SPLASH" && (
            <CustomDrawer
              activeRoute={currentRoute}
              tabs={filterSidebar}
              openSidebar={SidebarOpen}
              setopenSidebar={setSidebarOpen}
            />
          )}
        </NavigationContainer>
      </Common_Context.Provider>
    </ThemeProvider>
  );
}
