import { useNavigate, Outlet, Navigate } from "react-router-dom";

export const isLoggedin = () => {
  const token = localStorage.getItem("token");
  return !!token; // Return true if token exists, false otherwise
};

const Auth = () => {
  const navigate = useNavigate(); // Use the hook for navigation

  const handleChoosePlanClick = () => {
    if (isLoggedin()) {
      navigate("/api/v1/planpage"); // Programmatically navigate to the plan page if logged in
    } else {
      navigate("/api/v1/auth/login"); // Programmatically navigate to login page if not logged in
    }
  };

  return isLoggedin() ? <Outlet /> : <Navigate to="api/v1/auth/login" />;
};

export default Auth;
