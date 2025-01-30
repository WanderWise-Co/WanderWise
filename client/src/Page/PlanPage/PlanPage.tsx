import Footer from "../../Component/Footer";
import styles from "../PlanPage/PlanPage.module.css";
import PlacesList from "../../Component/PlacesList";
import { useState, useEffect, useContext } from "react";
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
import { AppContext } from "../../Hooks/AppProvider";

export default function PlanPage() {
  const {
    placeType,
    transportPlaneData,
    transportPlaneRecoData,
    transportBusesData,
    transportBusesRecoData,
    transportRentalData,
    gemeniData,
    hotelRecoData,
    navButton,
  } = useContext(AppContext);

  const lat = Number(localStorage.getItem("lat")) || 0;
  const lng = Number(localStorage.getItem("lng")) || 0;

  const [coordinates] = useState({ lat, lng });
  const [places, setPlaces] = useState<any[]>([]);

  const [source] = useState(localStorage.getItem("from") || "");
  const [destination] = useState(localStorage.getItem("to") || "");
  const [endDate] = useState(localStorage.getItem("endDate") || "");
  const [startDate] = useState(localStorage.getItem("startDate") || "");

  useEffect(() => {
    if (["restaurant", "hotel", "tourist_attraction"].includes(placeType)) {
      console.log("inside useEffect - valid placeType:", placeType);
      console.log(coordinates, placeType);
      fetchNearbyPlaces(placeType, setPlaces);
      console.log("fetchNearbyPlaces called");
    }
  }, [placeType, coordinates]);

  //debugging purpose
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
    console.log(
      "Transport Rental Data:",
      JSON.stringify(transportRentalData, null, 2)
    );
  }, [
    transportPlaneData,
    transportPlaneRecoData,
    transportBusesData,
    transportBusesRecoData,
    hotelRecoData,
    transportRentalData,
  ]);
  useEffect(() => {
    console.log("Received Data in PlanPage:");
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  }, [source, destination, startDate, endDate]);
  return (
    <>
      <Navbar />

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
