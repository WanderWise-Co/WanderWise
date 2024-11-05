// PlanPage.tsx
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
      const response = await axios.get(`http://localhost:3000/api/maps/api/place/nearbysearch/json`, {
        params: {
          location: `${lat},${lng}`,
          radius: 5000, // Radius in meters
          type: "restaurant",
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Optional: Consider using server-side key management for better security.
        },
      });
      console.log(response.data);     
      setRestaurants(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching restaurants:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  useEffect(() => {
    fetchNearbyRestaurants(coordinates.lat, coordinates.lng);
  }, [coordinates]);

  return (
    <>
      <Header />
      <div className={styles.planPageContainer}>
        <div className={styles.restaurantList}>
          <RestaurantList restaurants={restaurants} />
        </div>

        <div className={styles.mapContainer}>
          <Map coordinates={coordinates} restaurants={restaurants} />
        </div>
      </div>
      <Footer />
    </>
  );
}
