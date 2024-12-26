import axios from "axios";

const handleViewProfile = async (navigate: Function) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    console.log("Profile Data", response.data);
    navigate("/api/v1/profilepage", {
      state: { profileData: response.data },
    });
  } catch (error) {
    console.log("Error in UserDropdown to Profile (token)", error);
  }
};

export default handleViewProfile;
