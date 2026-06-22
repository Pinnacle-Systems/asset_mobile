import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Text as RNText, Text } from 'react-native';
import { useGetUserRolesOnPageQuery } from "./redux/service/user";
import { NavRef } from "./Component/Utils/NavigationRef";
import NavBar from "./Component/Navbar";
import CustomDrawer from "./Component/SideBar";
import tabs from "./Component/tabIndex";
import LoginScreen from "./Component/Login";

import { Easing } from "react-native-reanimated";
import SiderBarTabs from "./SideBardTabs/SidebarTabs";
import FlashMessage from "react-native-flash-message";
import Splash from "./Component/Splash";
import { Common_Context } from "./Context/Common_Context";
import { useNetInfo } from '@react-native-community/netinfo';
import { NetworkErrorView } from "./Component/Utils/NoIntertNetPage";
import { AllowedTabs_Filter } from "./Component/Utils/AllowedPagesFiltering";
import NoAllocatedPage from "./Component/Common/NoAllocatedPage";
import { requestLocationPermission } from "./Component/Utils/CustomLocation";
import { ensureLocationEnabled } from "./Component/Utils/EnsureLocation";
import { ThemeProvider } from "react-native-paper";
import LightModeProvider from "./LightModeProvider";



const Stack = createNativeStackNavigator()

// Apply global font
RNText.defaultProps = RNText.defaultProps || {};
RNText.defaultProps.style = { fontFamily: "PTSansNarrow-Regular" };

if (RNText.render) {
  const oldRender = RNText.render;
  RNText.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Nunito-Regular" }, origin.props.style],
    });
  };
}

const App = () => {
  const [tempUser, setTempUser] = useState("");
  const [compcode,setcompcode]=useState("")
  const [loading,setLoading]=useState(false)
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("LOGIN");
  const [isAdmin,setisAdmin]=useState(0)
  
  const netInfo = useNetInfo();


  const customTransitionSpec = {
    open: {
      animation: 'timing',
      config: {
        duration: 700,
        easing: Easing.out(Easing.exp),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 500,
        easing: Easing.in(Easing.circle),
      },
    },
  };





  // Load stored user
  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("userName");
      var Id=JSON?.parse(storedUser)
      setisAdmin(Id?.isAdmin || 0)
      setcompcode(Id?.GCOMPCODE)
      setTempUser(Id?.roleId);
    };
    fetchUser().finally(()=>setLoading(false))

    requestLocationPermission()
    
  }, []);
  
  const userRoleId=useMemo(()=>(tempUser?.split("@")[0])+"@"+compcode,[compcode,tempUser])
  const { data: rolesOnPage ,isLoading} = useGetUserRolesOnPageQuery( { RoleId:userRoleId});
 
  const roles = rolesOnPage?.data || [];

  const pages = roles?.length > 0
    ? roles.filter(role => role?.isdefault==true).map((data)=>data?.link)
    : tabs.map(tab => tab.link);
    
const filteredTabs = [
  ...((pages.length > 0 && isAdmin==0     ) 
    ? tabs.filter(tab => pages?.includes(tab?.key))
    : tabs.filter(tab => tab.name !== "LOGIN" && tab.name !== "SPLASH")),
  { name: "LOGIN", component: LoginScreen },
  { name: "SPLASH", component: Splash }
];





 



  const handleStateChange = useCallback((state) => {
    const current = state?.routes[state.index]?.name;
    setCurrentRoute(current);
  }, []);

  
const filterSidebar= AllowedTabs_Filter({tabs:SiderBarTabs,allowedTabs:filteredTabs,tabsPath_key:"path",allowedTabspath_key:"name"})  



if(!ensureLocationEnabled()) return <Text>Enable Location</Text>

if(!netInfo?.isConnected) return <NetworkErrorView isnet={!netInfo?.isConnected}>  </NetworkErrorView>



  return ( 
    <Common_Context.Provider value={{page:rolesOnPage?.data || [],loading:isLoading || loading,admin:isAdmin}}>
    <NavigationContainer
      ref={NavRef}
      onStateChange={handleStateChange}
    >

      {currentRoute !== "LOGIN" && currentRoute !== "SPLASH" && (
        <>
          <NavBar openSidebar={SidebarOpen} setopenSidebar={setSidebarOpen} />
          <CustomDrawer activeRoute={currentRoute} tabs={filterSidebar} openSidebar={SidebarOpen} setopenSidebar={setSidebarOpen} />
        </>
      )}

      <ThemeProvider>

      <Stack.Navigator initialRouteName="SPLASH"
      screenOptions={{
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            opacity: current.progress,
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.height, 0],
                }),
              },
              {
                rotate: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['180deg', '0deg'],
                }),
              },
            ],
          },
        }),
         // custom interpolator
        transitionSpec: customTransitionSpec,
      }}
      >
        {( isAdmin==1 ? tabs : filteredTabs)?.map((item) => (
          
          <Stack.Screen
            key={item?.name}
            name={item?.name}
            component={item?.component}
            options={{ headerShown: false }}
          />
        ))}
{
 isAdmin==0 && !rolesOnPage?.data?.length>0 &&   
   <Stack.Screen
            name={"DashBoard"}
            component={NoAllocatedPage}
            options={{ headerShown: false }}
          />
}
       
      </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
    </Common_Context.Provider>
  );

 
};

// App with Provider
export default function RootComponent() {
  return (
    <SafeAreaProvider>
    
      <Provider store={store}>
      <FlashMessage position="top" />
      <LightModeProvider>
        <App />
        </LightModeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
