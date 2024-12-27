import Footer from "../../Component/Footer";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../../Component/PlacesList";
import { useState, useEffect } from "react";
import Navbar from "../../Component/Navbar";
import CarRental from "../../Component/CarRental";
import FlightsList from "../../Component/FlightList";
import BusList from "../../Component/BusList";
import Gemini from "../../Component/Gemini";
import BusListRec from "../../Component/BusListRec";
import HotelReco from "../../Component/HotelReco";
import FlightRec from "../../Component/FlightRec";
import RouteMap from "../../Component/RouteMap";
import fetchNearbyPlaces from "../../Services/PlanPage/GoogleAPI";

export default function PlanPage() {
  const lat = Number(localStorage.getItem("lat")) || 0;
  const lng = Number(localStorage.getItem("lng")) || 0;

  const [coordinates, setCoordinates] = useState({ lat, lng });
  const [places, setPlaces] = useState<any[]>([]);
  const [placeType, setPlaceType] = useState("");

  const [transportPlaneData, setTransportPlaneData] = useState<any>(null);
  const [transportPlaneRecoData, setTransportPlaneRecoData] =
    useState<any>(null);
  const [transportBusesData, setTransportBusesData] = useState<any>(null);
  const [transportBusesRecoData, setTransportBusesRecoData] =
    useState<any>(null);
  const [transportRentalData, setTransportRentalData] = useState<any>(null);
  const [gemeniData, setGemeniData] = useState<any>(null);
  const [hotelRecoData, setHotelRecoData] = useState<any>(null);
  const [navButton, setNavButton] = useState("");

  const [source, setSource] = useState(localStorage.getItem("from") || "");
  const [destination, setDestination] = useState(
    localStorage.getItem("to") || ""
  );
  const [endDate, setEndDate] = useState(localStorage.getItem("endDate") || "");
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || ""
  );

  useEffect(() => {
    console.log("Received Data in PlanPage:");
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  }, [source, destination, startDate, endDate]);

  useEffect(() => {
    if (["restaurant", "hotel", "tourist_attraction"].includes(placeType)) {
      console.log("inside useEffect - valid placeType:", placeType);
      console.log(coordinates, placeType);
      fetchNearbyPlaces(placeType, setPlaces);
      console.log("fetchNearbyPlaces called");
    }
  }, [placeType, coordinates]);

  useEffect(() => {
    console.log(
      "Transport Plane Data:",
      JSON.stringify(transportPlaneData, null, 2)
    );
    console.log(
      "Transport Plane Recommendation Data:",
      JSON.stringify(transportPlaneRecoData, null, 2)
    );
    console.log(
      "Transport Buses Data:",
      JSON.stringify(transportBusesData, null, 2)
    );
    console.log(
      "Transport Buses Recommendation Data:",
      JSON.stringify(transportBusesRecoData, null, 2)
    );
    console.log("Hotel Recommendation Data:", hotelRecoData);
  }, [
    transportPlaneData,
    transportPlaneRecoData,
    transportBusesData,
    transportBusesRecoData,
    hotelRecoData,
  ]);

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
                <RouteMap />
              </div>
            </div>
          ) : navButton === "buses" ? (
            <div className={styles.busesContainer}>
              <div className={styles.left}>
                <BusList Buses={transportBusesData?.bus_data || []} />
              </div>
              <div className={styles.right}>
                <BusListRec buses={transportBusesRecoData || []} />
                <RouteMap />
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
            navButton === "attraction" ? (
            <PlacesList
              places={places}
              coordinates={coordinates}
              setNavButton={navButton}
            />
          ) : (
            <div className={styles.centeredText}>Begin Your Planning </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
