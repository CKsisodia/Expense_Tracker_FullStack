import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectLoginStatus } from "../../redux/reducers/authReducers";
import Loading from "../common/Loading";

const RequireAuth = () => {
  const isUserLoggedin = useSelector(selectLoginStatus);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isUserLoggedin]);

  if (isLoading) {
    return <Loading />;
  }
  return isUserLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
