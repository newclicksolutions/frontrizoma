import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./components/auth/LoginScreen";
import Dashboard from "./pages/dashboard";
import Setting from "./pages/setting";

export const JournalApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Setting} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};
