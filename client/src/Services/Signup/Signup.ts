import toast from "react-hot-toast";
import { emailRegex, passwordRegex } from "../../Utils/Reg";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

/**
 * Handles user signup with name, email, and password.
 * @param userDetails - User's name, email, and password.
 * @param navigate - React Router's navigate function.
 */
const handleSignUp = async (
  userDetails: { userName: string; userEmail: string; userPassword: string },
  navigate: NavigateFunction
) => {
  if (!userDetails.userName.trim()) {
    toast.error("Please enter a valid username");
    return;
  }
  if (!emailRegex.test(userDetails.userEmail)) {
    toast.error("Please enter a valid email");
    return;
  }
  if (!passwordRegex.test(userDetails.userPassword)) {
    toast.error("Please enter a valid password");
    return;
  }
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
      userDetails
    );
    console.log(response);

    toast.success(response.data.message || "Signup successful");
    navigate("/api/v1/auth/login");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Signup failed");
    console.error(error);
  }
};

export default handleSignUp;
