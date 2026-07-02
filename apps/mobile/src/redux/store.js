import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { commonMast, UsersApi } from './service';
import { setupListeners } from '@reduxjs/toolkit/query';

// Action dispatched on every new login to wipe all RTK Query caches
export const RESET_STORE = { type: 'RESET_STORE' };
import slices from "./Slices/UserDetails";
import { createLogger } from 'redux-logger';
import RoleOnSevices from "./service/RoleOn";

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
  [commonMast.reducerPath]: commonMast.reducer,
  [UsersApi.reducerPath]: UsersApi.reducer,
  [RoleOnSevices.reducerPath]: RoleOnSevices.reducer,
  UserDetails: slices.UserDetails,
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
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat([
        commonMast.middleware,
        UsersApi.middleware,
        RoleOnSevices.middleware,
        ...(__DEV__ ? [logger] : []) // Only add logger in development
      ]),

});

setupListeners(store.dispatch);