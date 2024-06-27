import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { selectLoginStatus } from "../../redux/reducers/authReducers";

const RedirectIfAuthenticated = () => {
  const isUserLoggedin = useSelector(selectLoginStatus);
  return isUserLoggedin ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default RedirectIfAuthenticated;
