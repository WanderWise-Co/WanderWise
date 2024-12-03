import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

interface NavbarProps {
  setPlaceType: (type: string) => void;
  setTransportPlaneData: (data: any) => void;
  setTransportBusesData: (data: any) => void;
  from: string;
  to: string;
  date: { startDate: string; endDate: string };
}

export default function Navbar({
  setPlaceType,
  setTransportPlaneData,
  setTransportBusesData,
  from,
  to,
  date,
}: NavbarProps) {
  const { startDate, endDate } = date;
  
  

  const handlePlaneClick = async () => {
    if (!from || !to) {
      console.error("From and To locations must be provided.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(from,to,startDate,endDate);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from, to, startDate, endDate },
        }
      );
      console.log("Planes API Response:", response.data);

      setTransportPlaneData(response.data); // Pass plane data to the parent
    } catch (error: any) {
      console.error("Error fetching planes data:", error.message || error.response?.data);
    }
  };

  const handleBusClick = async () => {
    if (!from || !to) {
      console.error("From and To locations must be provided.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(from,to,startDate,endDate);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/bus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from, to, startDate, endDate },
        }
      );
      console.log("Buses API",response.data)
      setTransportBusesData(response.data); // Pass bus data to the parent
    } catch (error: any) {
      console.error("Error fetching bus data:", error.message || error.response?.data);
    }
  };

  return (
    <div className={styles.navbar}>
      <a
        href="#recommendation"
        aria-label="Recommendation"
        onClick={() => setPlaceType("recommendation")}
      >
        Recommendation
      </a>
      <a
        href="#restaurants"
        aria-label="Restaurants"
        onClick={() => setPlaceType("restaurant")}
      >
        Restaurants
      </a>
      <a href="#hotels" aria-label="Hotels" onClick={() => setPlaceType("hotel")}>
        Hotels
      </a>
      <a
        href="#attractions"
        aria-label="Attractions"
        onClick={() => setPlaceType("tourist_attraction")}
      >
        Attractions
      </a>
      <a
        href="#renting"
        aria-label="Renting"
        onClick={() => setPlaceType("vehicle rental")}
      >
        Renting
      </a>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn} aria-haspopup="true" aria-expanded="false">
          Travel
          <i className="fa fa-caret-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <a href="#Buses" onClick={handleBusClick}>
            Buses
          </a>
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
