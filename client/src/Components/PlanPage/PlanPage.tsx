import Footer from "../singleComponent/Footer";
import Header from "../singleComponent/Header";
import styles from "../PlanPage/PlanPage.module.css";
import RestaurantList from "../singleComponent/RestaurantList"
import Map from "../singleComponent/Map"
import axios from "axios";
import { useState } from "react";

export default function PlanPage(){

  const [restaurants, setRestaurants] = useState([]);//restaurants: Stores an array of restaurant data from api 
  //setRestaurants is used to Update the restaurants state with the list of nearby restaurants after they are fetched.
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });//coordinates Holds the latitude and longitude of the location entered by the user.
  //setCoordinates Updates the coordinates after the location is geocoded
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: location,
          key: import.meta.env.GOOGLE_MAPS_API_KEY
        }
      });// does geocoding
      // console.log("Geocoding Response:", response.data);

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;//extracting lat and lan and geometry.loc is object
        setCoordinates({ lat, lng });//centering of map
        console.log("Coordinates:", { lat, lng });
        fetchNearbyRestaurants(lat, lng);
      } else {
        console.error("No results found for the specified location.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  const fetchNearbyRestaurants = async (lat, lng) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/maps/api/place/nearbysearch/json`, {
        params: {
          location: `${lat},${lng}`,
          radius: 5000, // Radius in meters
          type: "restaurant",
          key: import.meta.env.GOOGLE_MAPS_API_KEY
        }
      });
      console.log("Nearby Restaurants Data:", response.data.results);
      setRestaurants(response.data.results);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
    return(
        <>
        <Header></Header>
        <div className={styles.planPageContainer}>
        <RestaurantList restaurants={restaurants} />
        </div>

      {/* Right Column - 30% with Map */}
      <div className={styles.mapContainer}>
      <Map coordinates={coordinates} restaurants={restaurants} />
      </div>
        <Footer></Footer>
        </>
    )
}