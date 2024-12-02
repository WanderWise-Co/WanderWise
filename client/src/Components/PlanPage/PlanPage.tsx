import Footer from "../singleComponent/Footer";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../singleComponent/PlacesList";
import Map from "../singleComponent/Map";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../singleComponent/Navbar";

export default function PlanPage() {

  const location = useLocation();
  const initialCoordinates = location.state?.coordinates || { lat: 12.9716, lng: 77.5946 }; // Default to Bangalore
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [places, setPlaces] = useState([]);
  const [placeType, setPlaceType] = useState("");
  const [selectedPlacesByType, setSelectedPlacesByType] = useState<Record<string, string[]>>({}); // Categorize selected places
  const [transportData, setTransportData] = useState(null); // State to hold transport data

  const fetchNearbyPlaces = async (lat: number, lng: number, type: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/googleApi`, {
        params: {
          location: `${lat},${lng}`,
          radius: 5000,
          type: type,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      });
      setPlaces(response.data.results || []);
    } catch (error: any) {
      console.error("Error fetching places:", error.message || error.response?.data);
    }
  };

  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      fetchNearbyPlaces(coordinates.lat, coordinates.lng, placeType);
    }
  }, [coordinates, placeType]);

  useEffect(() => {
    if (transportData) {
      console.log("Transport Data:", transportData);
      // Handle transport data (e.g., display in UI)
    }
  }, [transportData]);
  
  const handleSelectedPlaces = (selectedPlaces: string[]) => {
    setSelectedPlacesByType((prev) => ({
      ...prev,
      [placeType]: selectedPlaces, // Save selections for the current type
    }));
  };

  const handleAddButton = () => {
    console.log("Selected Places By Type:", selectedPlacesByType);
  };

  return (
    <>
      <Navbar setPlaceType={setPlaceType} setTransportData={setTransportData} />
      <div className={styles.planPageContainer}>
        <div className={styles.placeList}>
          <PlacesList
            places={places}
            selectedPlaces={selectedPlacesByType[placeType] || []}
            onSelectedPlacesChange={handleSelectedPlaces}
            onAdd={handleAddButton}
          />
        </div>
        <div className={styles.mapContainer}>
          <Map coordinates={coordinates} places={places} />
        </div>
      </div>
      <Footer />
    </>
  );
}
