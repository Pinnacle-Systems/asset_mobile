import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dueDaysReducer from './Slices/dueDaysSlice';
import tableData from "./Slices/insuranceDataSlice";
import { poRegister, commonMast, supplier, poData, misDashboardService, ordManagement, UsersApi } from './service';
import { setupListeners } from '@reduxjs/toolkit/query';

// Action dispatched on every new login to wipe all RTK Query caches
export const RESET_STORE = { type: 'RESET_STORE' };
import UserDetails from "./Slices/UserDetails";
import inpuHandler from "./Slices/inputsHandler";
import PermissionEntry from "./service/permission";
import NotificationRTk from "./service/Notification";
import LeaveData from "./service/Leave";
import AdvanceData from "./service/Advance";
import { createLogger } from 'redux-logger';
import RoleOnSevices from "./service/RoleOn";
import OndutyRTk from "./service/Onduty";
import  slices from "./Slices/UserDetails";

// Define logger BEFORE using it in configureStore
const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
  predicate: () => __DEV__, // Only log in development
  duration: true,
  timestamp: true,
  colors: {
    title: () => '#0f0',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  }
});


// Combine all reducers so we can wrap them with a reset handler
const appReducer = combineReducers({
  [poRegister.reducerPath]: poRegister.reducer,
  [commonMast.reducerPath]: commonMast.reducer,
  [supplier.reducerPath]: supplier.reducer,
  [poData.reducerPath]: poData.reducer,
  [misDashboardService.reducerPath]: misDashboardService.reducer,
  [ordManagement.reducerPath]: ordManagement.reducer,
  [UsersApi.reducerPath]: UsersApi.reducer,
  [PermissionEntry.reducerPath]: PermissionEntry.reducer,
  [NotificationRTk.reducerPath]: NotificationRTk.reducer,
  [LeaveData.reducerPath]: LeaveData.reducer,
  [AdvanceData.reducerPath]: AdvanceData.reducer,
  [RoleOnSevices.reducerPath]: RoleOnSevices.reducer,
  [OndutyRTk.reducerPath]: OndutyRTk.reducer,
  dueDays: dueDaysReducer,
  tableData: tableData,
  UserDetails: slices.UserDetails,
  Input: inpuHandler,
  options: slices.Options,
});

// Root reducer: on RESET_STORE pass undefined as state so every
// sub-reducer (including all RTK Query caches) re-initialises from scratch.
const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([
        poRegister.middleware,
        commonMast.middleware,
        supplier.middleware,
        poData.middleware,
        misDashboardService.middleware,
        ordManagement.middleware,
        UsersApi.middleware,
        PermissionEntry.middleware,
        NotificationRTk.middleware,
        LeaveData.middleware,
        AdvanceData?.middleware,
        RoleOnSevices.middleware,
        OndutyRTk.middleware,
        ...(__DEV__ ? [logger] : []) // Only add logger in development
      ]),
      
});

setupListeners(store.dispatch);