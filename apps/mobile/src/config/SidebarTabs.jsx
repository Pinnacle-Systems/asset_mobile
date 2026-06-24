import React from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SidebarTabs = [
    { name: "Home", icon: <MaterialIcons name="home" size={24} />, path: "HOME" },
    { name: "Role On Page", icon: <MaterialIcons name="manage-accounts" size={24} />, path: "USERANDROLES" },
    { name: "Reports", icon: <MaterialCommunityIcons name="chart-bar-stacked" size={24} color="black" />, path: "report" }
];

export default SidebarTabs;
