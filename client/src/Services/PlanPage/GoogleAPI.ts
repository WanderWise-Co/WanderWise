import axios from "axios";

export default async function fetchNearbyPlaces(
  type: string,
  setPlaces: React.Dispatch<React.SetStateAction<any[]>>
) {
  console.log("fetchNearbyPlaces MAP CALL");

  const lat = Number(localStorage.getItem("lat")) || 0;
  const lng = Number(localStorage.getItem("lng")) || 0;

  try {
    console.log("fetchNearbyPlaces MAP CALL TRY 1");
    const response = await axios.get(`http://localhost:3000/api/v1/googleApi`, {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        type: type,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    });

    console.log(response);
    setPlaces(response.data.results || []);
    console.log("fetchNearbyPlaces MAP CALL TRY 2");
  } catch (error: any) {
    console.error(
      "Error fetching places:",
      error.message || error.response?.data
    );
  }
}
