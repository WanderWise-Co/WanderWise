import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

/**
 * Handles Google login integration.
 * @param navigate - React Router's navigate function.
 * @returns A function to trigger Google login.
 */
const useHandleContinueWithGoogle = (navigate: NavigateFunction) => {
  return useGoogleLogin({
    onSuccess: async (response: any) => {
      console.log(response);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_SERVER_URL}/auth/Oauth?oauth_provider=google`,
          {},
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token);
          navigate("/api/v1/homefilter");
        }
        console.log(res);
      } catch (error: any) {
        console.error("Google login failed:", error);
      }
    },
    onError: (error: any) => {
      console.error("Google Login Error:", error);
    },
  });
};

export default useHandleContinueWithGoogle;
