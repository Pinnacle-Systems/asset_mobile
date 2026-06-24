import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Common_Context } from "../contexts/Common_Context";
import { AllowedTabs_Filter } from "../utils/AllowedPagesFiltering";
import { useTheme } from "../theme/ThemeProvider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get('window');

const CARDS = [
  { id: '1', label: 'Asset Auditing', subtitle: 'Manage and verify company assets', action: 'asset', icon: 'barcode-scan', notify: 0 },
];

export function HomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("User");
  const { page, admin } = useContext(Common_Context);
  const { theme, isDarkMode } = useTheme();

  const currentStyles = styles(theme);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userName');
        if (storedUser) {
          let userNameObj = JSON.parse(storedUser);
          if (userNameObj?.userName) {
            setUsername(userNameObj.userName);
          }
        }
      } catch (e) {
        console.warn('Failed to load user', e);
      }
    };
    fetchUser();
  }, []);

  const filterCards = (admin == 1 || !page || page.length === 0) ? CARDS : AllowedTabs_Filter({
    tabs: CARDS,
    allowedTabs: page,
    tabsPath_key: "action",
    allowedTabspath_key: "link",
    condtion: "isdefault",
    condtion_op: { op: "==", val: 1 }
  });

  return (
    <SafeAreaView style={currentStyles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />

      {/* Simple Header */}
      <View style={currentStyles.titleSection}>
        <Text style={currentStyles.sectionTitle}>Home Screen</Text>
        <Text style={currentStyles.sectionSubtitle}>Select an action to continue</Text>
      </View>

      {/* Card Grid */}
      <ScrollView
        contentContainerStyle={currentStyles.cardContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={currentStyles.grid}>
          {filterCards?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={currentStyles.card}
              onPress={() => navigation.navigate(item.action)}
              activeOpacity={0.7}
            >
              <View style={currentStyles.iconWrapper}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={36}
                  color={theme.colors.accent}
                />
              </View>
              <View style={currentStyles.textContainer}>
                <Text style={currentStyles.cardText}>{item.label}</Text>
                {item.subtitle && (
                  <Text style={currentStyles.cardSubtitle}>{item.subtitle}</Text>
                )}
              </View>

              {item.notify !== undefined && item.notify > 0 && (
                <View style={currentStyles.badge}>
                  <Text style={currentStyles.badgeText}>{item.notify}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.subtext,
    marginTop: 6,
    fontWeight: '500',
    fontFamily: theme.fonts.semiBold,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: theme.colors.accentLight,   // Light blue tint
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
    fontFamily: theme.fonts.bold,
  },
  cardSubtitle: {
    fontSize: 13,
    color: theme.colors.subtext,
    fontWeight: '500',
    fontFamily: theme.fonts.regular,
  },
  badge: {
    backgroundColor: theme.colors.danger,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: theme.fonts.bold,
  },
});
