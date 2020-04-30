import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import { Container } from '@material-ui/core';

export default function AuthPage() {
  return (
    <Container>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Redirect exact from="/auth" to="/auth/login" />

        <Redirect to="/auth/login" />
      </Switch>
    </Container>
  );
}
