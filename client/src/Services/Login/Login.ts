import toast from "react-hot-toast";
import { emailRegex, passwordRegex } from "../../Utils/Reg";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

/**
 * Handles user login with email and password.
 * @param userDetails - User's email and password.
 * @param navigate - React Router's navigate function.
 */
const handleLogin = async (
  userDetails: { userEmail: string; userPassword: string },
  navigate: NavigateFunction
) => {
  if (!emailRegex.test(userDetails.userEmail)) {
    toast.error("Please enter a valid email");
    return;
  }
  if (!passwordRegex.test(userDetails.userPassword)) {
    toast.error("Please enter a valid password");
    return;
  }
  try {
    console.log("Logging in...");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`,
      userDetails
    );
    console.log(response);

    toast.success(response.data.message);

    localStorage.setItem("token", response.data.token);
    navigate("/api/v1/homefilter");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Login failed");
    console.error(error);
  }
};

export default handleLogin;
