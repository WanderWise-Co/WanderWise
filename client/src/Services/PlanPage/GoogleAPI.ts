import axios from "axios";
import { toast } from "react-toastify";

export default async function fetchNearbyPlaces(
  type: string,
  setPlaces: React.Dispatch<React.SetStateAction<any[]>>
) {
  console.log("Fetching places...");

  const lat = Number(localStorage.getItem("lat")) || 0;
  const lng = Number(localStorage.getItem("lng")) || 0;
  if (!lat || !lng) {
    toast.error("Latitude and longitude not found in localStorage");
    return;
  }
  try {
    console.log("LAT,LNG", lat, lng);

    console.log("Fetching places... 1");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/googleApi`,
      {
        params: {
          location: `${lat},${lng}`,
          radius: 5000,
          type: type,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    console.log(response);
    setPlaces(response.data.results);
    console.log("Fetching places... 2");
  } catch (error: any) {
    if (error.response.status === 401) {
      toast.error("Session expired. Please login again");
    }
    console.error(
      "Error fetching places:",
      error.message || error.response?.data
    );
  }
}
