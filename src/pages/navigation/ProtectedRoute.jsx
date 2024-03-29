import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  
  if (!accessToken) {
    return <Redirect to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;