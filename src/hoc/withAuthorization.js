import React from "react";
import { useHistory } from "react-router-dom";
// import { getCurrentUser } from "../services/userService";
// brianbmx_78@hotmail.com

const withAuthorization = (condition) => (Component) => {
  function Wrapper(props) {
    const history = useHistory();
    // const user = getCurrentUser();
    const user = null;
    console.log("--user--", user);
    if (!condition(!!user)) {
      console.log("--user--", user);
      const ROUTE = user ? "/login" : "/dashboard/login";
      // const ROUTE = user ? "/dashboard" : "/login";
      history.push(ROUTE);
    }
    return condition(!!user) ? <Component {...props} /> : null;
  }

  Wrapper.displayName = `withAuthorization(${
    Component.displayName || Component.name
  })`;
  return Wrapper;
};

export default withAuthorization;
