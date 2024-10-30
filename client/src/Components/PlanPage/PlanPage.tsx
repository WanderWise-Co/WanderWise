import Footer from "../singleComponent/Footer";
import Header from "../singleComponent/Header";
import styles from "../PlanPage/PlanPage.module.css";
import RestaurantList from "../singleComponent/RestaurantList";
import Map from "../singleComponent/Map";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get the passed data

export default function PlanPage() {
  const location = useLocation();
  const { coordinates } = location.state || { coordinates: { lat: 37.7749, lng: -122.4194 } }; // Default coordinates in case state is missing
  const [restaurants, setRestaurants] = useState([]); // Stores an array of restaurant data from the API

  const fetchNearbyRestaurants = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        params: {
          location: `${lat},${lng}`,
          radius: 5000, // Radius in meters
          type: "restaurant",
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      });
      setRestaurants(response.data.results);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchNearbyRestaurants(coordinates.lat, coordinates.lng);
  }, [coordinates]);

  return (
    <>
      <Header />
      <div className={styles.planPageContainer}>
        <RestaurantList restaurants={restaurants} />
      </div>

      <div className={styles.mapContainer}>
        <Map coordinates={coordinates} restaurants={restaurants} />
      </div>
      <Footer />
    </>
  );
}
