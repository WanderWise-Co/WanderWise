import Footer from "../singleComponent/Footer";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../singleComponent/PlacesList";
import Map from "../singleComponent/Map";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../singleComponent/Navbar";
import FlightsList from "../singleComponent/FlightList"; 
import BusList from "../singleComponent/BusList"; // Import FlightsList

export default function PlanPage() {
  const location = useLocation();
  const initialCoordinates = location.state?.coordinates || { lat: 12.9716, lng: 77.5946 }; // Default to Bangalore
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [places, setPlaces] = useState([]);
  const [placeType, setPlaceType] = useState("");
  const [selectedPlacesByType, setSelectedPlacesByType] = useState<Record<string, string[]>>({}); // Categorize selected places
  const [transportData, setTransportData] = useState<any>(null); // State to hold transport data
  const [BusData, setBusData] = useState<any>(null); 
  const [source, setSource] = useState(location.state?.source || "");
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || "Fri Dec 20 2024 00:00:00 GMT+0530 (India Standard Time)");

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
      <Navbar setPlaceType={setPlaceType} setTransportData={setTransportData} setBusData={setBusData} from={source}
      to={destination}
      date={date}/>
      <div className={styles.planPageContainer}>
        <div className={styles.placeList}>
          {transportData ? (
            <FlightsList
              flights={transportData.flights || []} // Fallback to empty array if flights is undefined
            />
          ) : (
            <PlacesList
              places={places}
              selectedPlaces={selectedPlacesByType[placeType] || []}
              onSelectedPlacesChange={handleSelectedPlaces}
              onAdd={handleAddButton}
            />
          )}
          { BusData ? (
            <BusList
              flights={BusData.bus_data } // Fallback to empty array if flights is undefined
            />
          ) : (
            <PlacesList
              places={places}
              selectedPlaces={selectedPlacesByType[placeType] || []}
              onSelectedPlacesChange={handleSelectedPlaces}
              onAdd={handleAddButton}
            />
          )}
        </div>
        <div className={styles.mapContainer}>
          <Map coordinates={coordinates} places={places} />
        </div>
      </div>
      <Footer />
    </>
  );
}
