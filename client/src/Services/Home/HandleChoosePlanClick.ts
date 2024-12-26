import axios from "axios";
import { isLoggedin } from "../../Utils/Auth";
import toast from "react-hot-toast";
import validateLocation from "../../Utils/ValidateLocation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const handleChoosePlanClick = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const destination = localStorage.getItem("to");
    const source = localStorage.getItem("from");

    if (!destination) {
      toast.error("Destination cannot be empty.");
      return;
    }
    if (!source) {
      toast.error("Source cannot be empty.");
      return;
    }

    const isSourceValid = await validateLocation(source);
    const isDestinationValid = await validateLocation(destination);

    if (!isSourceValid) {
      toast.error("Invalid source location. Please enter a valid location.");
      return;
    }

    if (!isDestinationValid) {
      toast.error(
        "Invalid destination location. Please enter a valid location."
      );
      return;
    }

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: destination,
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          },
        }
      );

      if (response.data.status !== "OK" || response.data.results.length === 0) {
        console.error("Geocoding failed:", response.data.status);
        toast.error("Failed to fetch location details. Please try again.");
        return;
      }

      const { lat, lng } = response.data.results[0].geometry.location;
      if (lat && lng) {
        localStorage.setItem("lat", lat.toString());
        localStorage.setItem("lng", lng.toString());
      }
    } catch (error: any) {
      console.error("Error", error.message);
      toast.error("Error fetching location details.");
      return;
    }

    if (isLoggedin()) {
      navigate(`/api/v1/homefilter`);
    } else {
      navigate("/api/v1/auth/login");
    }
  };

  return handleClick;
};

export default handleChoosePlanClick;
