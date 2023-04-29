import React from "react";
import { Navigate } from "react-router-dom";
import { getAdminUser } from "./helpers";

const PrivateAddBookRoute = ({ children }) => {
  const isOn = getAdminUser();
  return isOn ? children : <Navigate to={"/login"} />;
};

export default PrivateAddBookRoute;
