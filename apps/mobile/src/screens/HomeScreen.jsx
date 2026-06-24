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
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Common_Context } from "../contexts/Common_Context";
import { AllowedTabs_Filter } from "../utils/AllowedPagesFiltering";

const { width } = Dimensions.get('window');

const CARDS = [
  { id: '1', label: 'Asset Auditing', subtitle: 'Manage and verify company assets', action: 'asset', image: require('../assets/barcode.png'), notify: 0 },
];

export function HomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("User");
  const { page, admin } = useContext(Common_Context);

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

      {/* Simple Header */}
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>Home Screen</Text>
        <Text style={styles.sectionSubtitle}>Select an action to continue</Text>
      </View>

      {/* Card Grid */}
      <ScrollView 
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filterCards?.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card} 
              onPress={() => navigation.navigate(item.action)}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Image style={styles.cardImage} source={item.image} resizeMode="contain" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>{item.label}</Text>
                {item.subtitle && (
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              
              {item.notify !== undefined && item.notify > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.notify}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '500',
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
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexDirection: "row",
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardImage: {
    width: 54,
    height: 54,
  },
  textContainer: {
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: "#1e293b",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#ef4444',
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
  },
});
