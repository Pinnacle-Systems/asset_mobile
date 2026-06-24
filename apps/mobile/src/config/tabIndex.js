import React from 'react';
import { View, Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen.jsx';
import AssetAudit from '../screens/AssetAudit.jsx';
import Splash from '../screens/Splash.jsx';
import LoginScreen from '../screens/Login.jsx';
import AuditReport from '../screens/AuditReport.jsx';

import UserAndRoles from '../screens/UserAndRoles/index.jsx';
import ReportMaster from '../screens/ReportMaster.jsx';

const tabs = [
    { key: "LOGIN", name: "LOGIN", component: LoginScreen, list:false, list_name:"Login", default:true },
    { key: 'USERANDROLES', name: "USERANDROLES", component: UserAndRoles, list:true, list_name:"Role On Page" },
    { key: "HOME", name: "HOME", component: HomeScreen, list:true, default:true, list_name:"Home Page" },
    { key: "DashBoard", name: "DashBoard", component: HomeScreen, list:true, default:true, list_name:"DashBoard" },
    { key: "SPLASH", name: "SPLASH", component: Splash, list:false, default:true, list_name:"Splash" },
    { key: "asset", name: "asset", component: AssetAudit, list:true, default:false, list_name:"Asset Auditing" },
    { key: "audit", name: "audit", component: AuditReport, list:true, default:false, list_name:"Auditing Report" },
    { key: "report", name: "report", component: ReportMaster, list:true, default:false, list_name:"Report Dashboard" },
];

export default tabs;
