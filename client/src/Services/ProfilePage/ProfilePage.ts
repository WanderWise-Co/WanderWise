import axios from "axios";
import toast from "react-hot-toast";

const handleViewProfile = async (navigate: Function) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Unauthorized access");
    return;
  }
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Profile Data", response.data);
    navigate("/profilepage", {
      state: { profileData: response.data },
    });
  } catch (error) {
    console.log("Error in UserDropdown to Profile (token)", error);
  }
};

export default handleViewProfile;
