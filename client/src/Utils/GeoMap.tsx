import axios from "axios";

const GeoMap = async () => {
  try {
    const to = localStorage.getItem("to");
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: to,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status !== "OK" || response.data.results.length === 0) {
      console.error("Geocoding failed:", response.data.status);
      return;
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    console.log(lat, lng);
    if (lat && lng) {
      localStorage.setItem("lat", lat);
      localStorage.setItem("lng", lng);
    }
  } catch (error: any) {
    console.log("Error", error);
  }
};
export default GeoMap;
