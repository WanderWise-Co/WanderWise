import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const useHandleContinueWithGoogle = (navigate: NavigateFunction) => {
  return useGoogleLogin({
    onSuccess: async (response: any) => {
      console.log(response);
      try {
        const res = await axios.post(
          `${
            import.meta.env.VITE_BASE_SERVER_URL
          }/api/v1/auth/Oauth?oauth_provider=google`,
          {},
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token);
          navigate("/homefilter");
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
