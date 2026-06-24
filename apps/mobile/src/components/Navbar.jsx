import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from 'react-redux';
import { Common_Context } from '../contexts/Common_Context';
import { TextOnlyDropdown } from './TextOnlyDropDown';
import { useGetCompanycodeQuery } from '../redux/service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserDetails } from '../redux/Slices/UserDetails';

export default function NavBar({ openSidebar, setopenSidebar }) {
  const navigation = useNavigation();
  const commoncontext = useContext(Common_Context);
  const UserSelect = useSelector((state) => state?.UserDetails);
  const dispatch = useDispatch();
  const [GlobalSelected, setGlobalSelected] = React.useState();
  const { data: companyCode } = useGetCompanycodeQuery();

  React.useEffect(() => {
    if (GlobalSelected) {
      AsyncStorage.getItem("userName", (error, result) => {
        if (!error && result) {
          const GetuserDetails = JSON.parse(result);
          const { GCOMPCODE: OLD, ...reset } = GetuserDetails;
          
          AsyncStorage.setItem("userName", JSON.stringify({ ...reset, GCOMPCODE: GlobalSelected })).finally(() => {
            dispatch(setUserDetails({
              ...GetuserDetails,
              GCOMPCODE: GlobalSelected,
            }));
          });
        }
      });
    } else {
      AsyncStorage.getItem("userName", (error, result) => {
        if (!error && result) {
          const GetuserDetails = JSON.parse(result);
          dispatch(setUserDetails({
            userName: GetuserDetails?.userName,
            UserId: GetuserDetails?.Id,
            IDCARD: GetuserDetails?.Id,
            GCOMPCODE: GetuserDetails?.GCOMPCODE,
            COMPID: GetuserDetails?.COMPID,
            hod: GetuserDetails?.hod,
            approval: GetuserDetails?.approval,
            hr: GetuserDetails?.hr
          }));
        }
      });
    }
  }, [GlobalSelected]);

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.wishesView}>
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Image 
            style={styles.logoImage} 
            resizeMode={"contain"} 
            source={require("../assets/logo.png")} 
          />
        </TouchableOpacity>
        <View>
          {commoncontext?.admin == 1 && commoncontext?.admin && (
             <TextOnlyDropdown
                selected={GlobalSelected}
                disabled={commoncontext?.admin == 1 ? false : true}
                auto_open={GlobalSelected || UserSelect?.GCOMPCODE}
                label={GlobalSelected || UserSelect?.GCOMPCODE || "GLOBAL"}
                setSelected={setGlobalSelected}
                labelstyle={styles.wishesText}
                options={companyCode}
                zIndex={300}
             />
          )}
        </View>
      </View>
       
      <View style={styles.NotificationView}>

        
        <Pressable onPress={() => setopenSidebar(true)} style={styles.iconContainer}>
          <AntDesign name="bars" size={22} color="#085fd1" /> 
        </Pressable>
      </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d1d5db',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  wishesView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center"
  },
  logoImage: {
    width: 140,
    height: 35,
    marginLeft: -10
  },
  wishesText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 3,
    color: "#57575e",
    marginTop: 9,
  },
  NotificationView: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  iconContainer: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 2,
  },
});
