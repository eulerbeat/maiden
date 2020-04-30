/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./app/router/Routes";

export default function App({ store, persistor }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
