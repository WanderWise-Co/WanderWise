import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

interface NavbarProps {
  setPlaceType: (type: string) => void;
  setTransportData: (data: any) => void; // Callback to send API response back
}

export default function Navbar({ setPlaceType, setTransportData }: NavbarProps) {

  const handlePlaneClick = async () => {
    console.log("try")
    try {
      const token = localStorage.getItem("token");
      console.log("try 1")
      console.log(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`, token);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Planes API Response:", response.data);
      setTransportData(response.data.data); // Pass data to the parent
    } catch (error: any) {
      console.error("Error fetching planes data:", error.message || error.response?.data);
    }
  };

  const handleBusClick = async () => {
    console.log("try")
    try {
      const token = localStorage.getItem("token");
      console.log("try 1")
      console.log(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/bus`, token);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/bus`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Bus API Response:", response.data);
      setTransportData(response.data.data); // Pass data to the parent
    } catch (error: any) {
      console.error("Error fetching bus data:", error.message || error.response?.data);
    }
  };
 
  const handleRentalClick = async () => {
    console.log("try")
    try {
      const token = localStorage.getItem("token");
      console.log("try 1")
      console.log(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/rental`, token);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/rental`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },params:{from:"Bangalore"},
        }
      );
      console.log("Rental API Response:", response.data);
      setTransportData(response.data.data.car_rentals); // Pass data to the parent
    } catch (error: any) {
      console.error("Error fetching rental data:", error.message || error.response?.data);
    }
  };
  
  
  return (
    <div className={styles.navbar}>
      <a href="#recommendation" aria-label="Recommendation" onClick={() => setPlaceType("recommendation")}>
        Recommendation
      </a>
      <a href="#restaurants" aria-label="Restaurants" onClick={() => setPlaceType("restaurant")}>
        Restaurants
      </a>
      <a href="#hotels" aria-label="Hotels" onClick={() => setPlaceType("hotel")}>
        Hotels
      </a>
      <a href="#attractions" aria-label="Attractions" onClick={() => setPlaceType("tourist_attraction")}>
        Attractions
      </a>
      <a href="#renting" aria-label="Renting" onClick={handleRentalClick}>
        Renting
      </a>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn} aria-haspopup="true" aria-expanded="false">
          Travel
          <i className="fa fa-caret-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <a href="#Buses" onClick={handleBusClick}>Buses</a>
          <a href="#Planes" onClick={handlePlaneClick}>
            Planes
          </a>
        </div>
      </div>

      <div className={styles.cartIcon}>
        <FaShoppingCart className={styles.cart} />
      </div>
    </div>
  );
}
