import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./components/auth/LoginScreen";
import RegisterScreen from "./components/auth/RegisterScreen";
import Dashboard from "./pages/dashboard";
import Community from "./pages/community";
import Setting from "./pages/setting";

export const JournalApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/community" component={Community} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};
