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
      console.log("try 1")
      console.log(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`)
      const response = await axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`);
      console.log("Planes API Response:", response.data);
      console.log(response)
      setTransportData(response.data); // Pass data to the parent
    } catch (error: any) {
      console.error("Error fetching planes data:", error.message || error.response?.data);
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
      <a href="#renting" aria-label="Renting" onClick={() => setPlaceType("vehicle rental")}>
        Renting
      </a>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn} aria-haspopup="true" aria-expanded="false">
          Travel
          <i className="fa fa-caret-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <a href="#Buses">Buses</a>
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
