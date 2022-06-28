import React from "react";
import { authCondition } from "../../constants/authorization";
import withAuthorization from "../../hoc/withAuthorization";

const MenuLeft = () => {
  return <div>menuLeft</div>;
};

export default withAuthorization(authCondition)(MenuLeft);
