import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";

import { AppProviders } from "./providers/AppProviders.jsx";

export function App() {
  return (
    <Provider store={store}>
      <AppProviders />
    </Provider>
  );
}
