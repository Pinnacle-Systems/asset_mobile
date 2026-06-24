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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Common_Context } from "../contexts/Common_Context";
import { AllowedTabs_Filter } from "../utils/AllowedPagesFiltering";

const { width } = Dimensions.get('window');

const CARDS = [
  { id: '1', label: 'Asset Auditing', action: 'asset', image: require('../assets/barcode.png'), notify: 0, bg: "#8c98a3" },
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
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      


      {/* Dashboard title */}
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>Dashboard</Text>
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
              style={[styles.card, { backgroundColor: item.bg }]} 
              onPress={() => {
                navigation.navigate(item.action);
              }}
              activeOpacity={0.8}
            >
              <Image style={styles.cardImage} source={item.image} />
              <Text style={styles.cardText}>{item.label}</Text>
              
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
    backgroundColor: '#f9fafb',
  },

  titleSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  card: {
    width: width * 0.9,
    height: 90,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 10,
    marginVertical: 4,
    flexDirection: "row",
    gap: 15,
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginLeft: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '700',
    color: "#FFF",
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
