import axios from "axios";

const validateLocation = async (address: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status === "OK" && response.data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating location:", error);
    return false;
  }
};

export default validateLocation;
