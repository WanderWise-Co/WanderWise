import Footer from "../singleComponent/Footer";
import Header from "../singleComponent/Header";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../singleComponent/PlacesList";
import Map from "../singleComponent/Map";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../singleComponent/Navbar"; // Import Navbar

export default function PlanPage() {
  const location = useLocation();
  console.log(location);
  // Get the coordinates from the location state (or fallback to Bangalore)
  const initialCoordinates = location.state?.coordinates //|| { lat: 12.9716, lng: 77.5946 }; // Default to Bangalore
  const [coordinates, setCoordinates] = useState(initialCoordinates); // Store coordinates in state
  const [places, setPlaces] = useState([]); // Store results of any type of places
  const [placeType, setPlaceType] = useState(""); // Track place type

  // Function to fetch nearby places based on type (restaurant, hotel, rental, etc.)
  const fetchNearbyPlaces = async (lat: number, lng: number, type: string) => {
    console.log("google response api......")
    try {
      console.log("type:",type,lat,lng);
      // const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        const response = await axios.get(`http://localhost:3000/api/v1/googleApi`, {
        
        params: {
          location: `${lat},${lng}`,
          radius: 5000,
          type: type,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      });
      console.log("google response api",response)
      setPlaces(response.data.results); // Store the fetched places (restaurants, hotels, rentals, etc.)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching places:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  console.log("planpage",coordinates);
  // Fetch places when coordinates or place type changes
  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      fetchNearbyPlaces(coordinates.lat, coordinates.lng, placeType); // Fetch places based on selected type
    }
  }, [coordinates, placeType]); // Re-fetch when coordinates or placeType changes

  return (
    <>
      <Header />
      <Navbar setPlaceType={setPlaceType} /> {/* Pass setPlaceType to Navbar */}
      <div className={styles.planPageContainer}>
        <div className={styles.restaurantList}>
          <PlacesList restaurants={places} /> {/* Pass places to RestaurantList */}
        </div>
        <div className={styles.mapContainer}>
          <Map coordinates={coordinates} restaurants={places} /> {/* Pass places to Map */}
        </div>
      </div>
      <Footer />
    </>
  );
}
