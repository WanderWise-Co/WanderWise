import Footer from "../singleComponent/Footer";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../singleComponent/PlacesList";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../singleComponent/Navbar";
import CarRental from "../singleComponent/CarRental";
import FlightsList from "../singleComponent/FlightList";
import BusList from "../singleComponent/BusList";
import Gemini from "../singleComponent/Gemini";
import BusListRec from "../singleComponent/BusListRec";
import HotelReco from "../singleComponent/HotelReco";
import FlightRec from "../singleComponent/FlightRec";

export default function PlanPage() {
  // const location = useLocation();
  const lat = Number(localStorage.getItem("lat")) || 0; // Default to 0 if null or invalid
  const lng = Number(localStorage.getItem("lng")) || 0; // Default to 0 if null or invalid
  const [coordinates, setCoordinates] = useState({ lat, lng });


  const [places, setPlaces] = useState([]);
  const [placeType, setPlaceType] = useState("");
  //const [selectedPlacesByType, setSelectedPlacesByType] = useState<Record<string, string[]>>({});
  const [transportPlaneData, setTransportPlaneData] = useState<any>(null);
  const [transportPlaneRecoData, setTransportPlaneRecoData] = useState<any>(null);
  const [transportBusesData, setTransportBusesData] = useState<any>(null);
  const [transportBusesRecoData, setTransportBusesRecoData] = useState<any>(null);
  const [transportRentalData, setTransportRentalData] = useState<any>(null);
  const [gemeniData, setGemeniData] = useState<any>(null);
  const [hotelRecoData, setHotelRecoData] = useState<any>(null);
  // const [selectedCategories, setSelectedCategories] = useState(location.state?.selectedCategories || []);
  const [navButton, setNavButton] = useState(""); // State for tracking the selected nav button

  const [source, setSource] = useState(localStorage.getItem("from") || "");
  const [destination, setDestination] = useState(localStorage.getItem("to") || "");
  const [endDate, setEndDate] = useState(localStorage.getItem("endDate") || "");
  const [startDate, setStartDate] = useState(localStorage.getItem("startDate") || "");

  useEffect(() => {
    console.log("Received Data in PlanPage:");
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  }, [source, destination, startDate, endDate]);

  const fetchNearbyPlaces = async (lat: number, lng: number, type: string) => {
    console.log("fetchNearbyPlaces");
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
    console.log("inside use effect")
    console.log(coordinates,placeType)
    if (coordinates && coordinates.lat && coordinates.lng && placeType) {
      console.log("inside use effect inside if")
      fetchNearbyPlaces(coordinates.lat, coordinates.lng, placeType);
      console.log("inside use effect inside if")
    }
  }, [coordinates, placeType]);

  // const handleSelectedPlaces = (selectedPlaces: string[]) => {
  //   setSelectedPlacesByType((prev) => ({
  //     ...prev,
  //     [placeType]: selectedPlaces, // Save selections for the current type
  //   }));
  // };

  useEffect(() => {
    console.log("Transport Plane Data:", JSON.stringify(transportPlaneData, null, 2));
    console.log("Transport Plane Recommendation Data:", JSON.stringify(transportPlaneRecoData, null, 2));
    console.log("Transport Buses Data:", JSON.stringify(transportBusesData, null, 2));
    console.log("Transport Buses Recommendation Data:", JSON.stringify(transportBusesRecoData, null, 2));
    console.log("Hotel Recommendation Data:", hotelRecoData);
  }, [transportPlaneData, transportPlaneRecoData, transportBusesData, transportBusesRecoData, hotelRecoData]);

  // const handleAddButton = () => {
  //   console.log("Selected Places By Type:", selectedPlacesByType);
  // };

  return (
    <>
      <Navbar
        setPlaceType={setPlaceType}
        setTransportPlaneData={setTransportPlaneData}
        setTransportPlaneRecoData={setTransportPlaneRecoData}
        setTransportBusesData={setTransportBusesData}
        setTransportBusesRecoData={setTransportBusesRecoData}
        setTransportRentalData={setTransportRentalData}
        setGemeniData={setGemeniData}
        setHotelRecoData={setHotelRecoData}
        setNavButton={setNavButton}
      />

      <div className={styles.planPageContainer}>
        <div className={styles.contentContainer}>
          {navButton === "planes" ? (
            <div className={styles.planesContainer}>
            <div className={styles.left}>
              <FlightsList flights={transportPlaneData?.flights || []} />
            </div>
            <div className={styles.right}>
              <FlightRec flightrec={transportPlaneRecoData || []} />
            </div>
          </div>
          ) : navButton === "buses" ? (
            <div className={styles.busesContainer}>
              <div className={styles.left}>
                <BusList Buses={transportBusesData?.bus_data || []} />
              </div>
              <div className={styles.right}>
                <BusListRec buses={transportBusesRecoData || []} />
              </div>
            </div>
          ) : navButton === "renting" ? (
            <CarRental rentals={transportRentalData?.car_rentals || []} />
          ) : navButton === "recommendations" ? (
            <>
              <Gemini data={gemeniData || []} />
              <HotelReco hotelreco={hotelRecoData?.data || []} />
            </>
          ) : navButton === "restaurant" ||
            navButton === "hotel" ||
            navButton === "attraction" ||
            navButton === "renting" ? (
              <PlacesList
              places={places}
              coordinates={coordinates}
              setNavButton={navButton} // Pass navButton instead of setNavButton
            />            
          ) : <div className={styles.centeredText}>Begin Your Planning </div>}
        </div>
      </div>
      <Footer />
    </>
  );
}
