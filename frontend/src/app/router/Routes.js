/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import HomePage from "../pages/home/HomePage";
import AuthPage from "../pages/auth/AuthPage";

export const Routes = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );

  return isAuthorized ? <HomePage /> : <AuthPage />;
};
