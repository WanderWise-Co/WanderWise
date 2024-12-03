import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

interface NavbarProps {
  setPlaceType: (type: string) => void;
  setTransportPlaneData: (data: any) => void;
  setTransportBusesData: (data: any) => void;
  setGemeniData: (data: any) => void;
  setNavButton: (data: string) => void;  // Accept the setter function
  from: string;
  to: string;
  date: { startDate: string; endDate: string };
}

export default function Navbar({
  setPlaceType,
  setTransportPlaneData,
  setTransportBusesData,
  setGemeniData,
  setNavButton,
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
      setNavButton("planes"); // Set the navButton state to "planes"
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from:"bangalore", to:"chenai", startDate,endDate},
        }
      );
      setTransportPlaneData(response.data.data);
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
      setNavButton("buses"); 
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/bus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from: "bangalore",
            to: "chennai",
            startDate: "Fri Dec 20 2024 00:00:00 GMT+0530 (India Standard Time)",
            endDate: "Fri Dec 20 2024 00:00:00 GMT+0530 (India Standard Time)",},
        }
      );
      console.log(response.data.data)
      setTransportBusesData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching bus data:", error.message || error.response?.data);
    }
  };

  const HandelRecoClick = async () => {
    if (!from || !to) {
      console.error("From and To locations must be provided.");
      return;
    }

    try {
      // setNavButton("buses"); 
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/gemini`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from: "bangalore",
            to: "chennai",
            startDate: "Fri Dec 20 2024 00:00:00 GMT+0530 (India Standard Time)",
            endDate: "Fri Dec 20 2024 00:00:00 GMT+0530 (India Standard Time)",},
        }
      );
      console.log(response.data)
      setGemeniData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching gimini data:", error.message || error.response?.data);
    }
  };

  return (
    <div className={styles.navbar}>
      <a
        href="#recommendation"
        onClick={() => {
          setNavButton("recommendations");
          setPlaceType("recommendation");
          HandelRecoClick()
        }}
      >
        Recommendation
      </a>
      <a
        href="#restaurants"
        onClick={() => {
          setNavButton("restaurants");
          setPlaceType("restaurant");
        }}
      >
        Restaurants
      </a>
      <a href="#hotels" onClick={() => {
          setNavButton("hotels");
          setPlaceType("hotel");
        }}>
        Hotels
      </a>
      <a
        href="#attractions"
        onClick={() => {
          setNavButton("attractions");
          setPlaceType("tourist_attraction");
        }}
      >
        Attractions
      </a>
      <a
        href="#renting"
        onClick={() => {
          setNavButton("renting");
          setPlaceType("vehicle rental");
        }}
      >
        Renting
      </a>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          Travel
          <i className="fa fa-caret-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <a href="#Buses" onClick={handleBusClick} >
            Buses
          </a>
          <a href="#Planes" onClick={handlePlaneClick}>
            Planes
          </a>
        </div>
      </div>

      <div className={styles.cartIcon}>
        <FaShoppingCart />
      </div>
    </div>
  );
}
