import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginSuccess from "./LoginSuccess";

export default function HomePage() {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/success" component={LoginSuccess} />

      {/* <Redirect to="/dashboard" /> */}
    </Switch>
  );
}
