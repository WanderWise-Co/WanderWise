import Footer from "../singleComponent/Footer";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../singleComponent/PlacesList";
import Map from "../singleComponent/Map";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../singleComponent/Navbar";
import FlightsList from "../singleComponent/FlightList";
import BusList from "../singleComponent/BusList"; // Import BusList

export default function PlanPage() {
  const location = useLocation();
  const initialCoordinates = location.state?.coordinates || { lat: 12.9716, lng: 77.5946 };
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [places, setPlaces] = useState([]);
  const [placeType, setPlaceType] = useState("");
  const [selectedPlacesByType, setSelectedPlacesByType] = useState<Record<string, string[]>>({});
  const [transportPlaneData, setTransportPlaneData] = useState<any>(null); // Separate state for planes
  const [transportBusesData, setTransportBusesData] = useState<any>(null); // Separate state for buses
  const [selectedCategories, setSelectedCategories] = useState(location.state?.selectedCategories || []);
  const [source, setSource] = useState(location.state?.source || "");
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || "");

  useEffect(() => {
    console.log("Received Data in PlanPage:");
    console.log("Coordinates:", coordinates);
    console.log("Selected Categories:", selectedCategories);
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Date", date);
  }, [coordinates, selectedCategories, source, destination, date]);

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
      [placeType]: selectedPlaces,
    }));
  };

  useEffect(() => {
    console.log("Transport Plane Data:", transportPlaneData);
    console.log("Transport Buses Data:", transportBusesData);
  }, [transportPlaneData, transportBusesData]);
  
  
  const handleAddButton = () => {
    console.log("Selected Places By Type:", selectedPlacesByType);
  };
  return (
    <>
      <Navbar
      setPlaceType={setPlaceType}
      setTransportPlaneData={setTransportPlaneData} // Pass the actual state setter
      setTransportBusesData={setTransportBusesData} // Pass the actual state setter
      from={source}
      to={destination}
      date={date}
      />


      <div className={styles.planPageContainer}>
        <div className={styles.placeList}>
          {transportPlaneData && transportPlaneData.flights ? (
            <FlightsList flights={transportPlaneData.flights || []} />
          ) : transportBusesData && transportBusesData.bus_data ? (
            <BusList buses={transportBusesData.bus_data || []} />
            
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
