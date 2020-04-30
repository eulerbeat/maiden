import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import { Container } from '@material-ui/core';

export default function AuthPage() {
  return (
    <Container>
      <Switch>
        <Redirect exact from="/" to="/auth/login" />

        <Route path="/auth/login" component={Login} />

        <Redirect to="/auth/login" />
      </Switch>
    </Container>
  );
}
