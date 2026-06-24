import { API_URL,ASSET_TOMTOM_API_KEY } from '@env';

// export const BASE_URL = 'https://bharanipriya.pinnaclesystems.co.in'
//export const BASE_URL = 'http://192.168.1.43:8025/'
//export const BASE_URL = 'https://bsamobile.pinnaclesystems.co.in'
//export const BASE_URL = "https://bharanipriya.pinnaclesystems.co.in"
export const BASE_URL = API_URL;

export const PO_REGISTER = '/poRegister'
export const COMMON_MAST = '/commonMast'
export const SUPPLIER = '/supplier'
export const PO_DATA = '/poData'
export const MIS_DASHBOARD = '/misDashboard'
export const ORD_MANAGEMENT = '/ordManagement'
export const LOGIN_API = "users/login"
export const USERS_API = "users"
export const UserDetails="userDetails"
export const Permission="Permission"
export const Notifi="Notifi"
export const Leave="leave"
export const Advance="advance"
export const Role='role'
export const onduty='onduty'
export const Onduty_Image_url=BASE_URL+"/"+onduty+"/Onduty_uploaded_image"
export const TOMTOM_API_KEY = ASSET_TOMTOM_API_KEY ;
