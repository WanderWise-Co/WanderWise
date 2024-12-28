import { Outlet, Navigate } from "react-router-dom";

export const isLoggedin = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const Auth = () => {
  return isLoggedin() ? <Outlet /> : <Navigate to="api/v1/auth/login" />;
};

export default Auth;
