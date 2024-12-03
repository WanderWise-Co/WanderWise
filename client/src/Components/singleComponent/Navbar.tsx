import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import styles from "./Navbar.module.css";

interface NavbarProps {
  setPlaceType: (type: string) => void;
  setTransportPlaneData: (data: any) => void;
  setTransportBusesData: (data: any) => void;
  setNavButton: (data: string) => void;  // Accept the setter function
  from: string;
  to: string;
  date: { startDate: string; endDate: string };
}

export default function Navbar({
  setPlaceType,
  setTransportPlaneData,
  setTransportBusesData,
  setNavButton,
  from,
  to,
  date,
}: NavbarProps) {

  const { startDate, endDate } = date;
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePlaneClick = async () => {
    console.log("Plane button clicked!");
    // if (!from || !to) {
    //   console.error("From and To locations must be provided.");
    //   return;
    // }

    try {
      setNavButton("planes"); // Set the navButton state to "planes"
      const token = localStorage.getItem("token");
      console.log(token);
      const from = localStorage.getItem("from");
      const to = localStorage.getItem("to");
      const sDate = localStorage.getItem("startDate");
      const eDate = localStorage.getItem("endDate");
      console.log(token,from,to,sDate,eDate);
      console.log('planing')
      if (!(token && from && to && sDate && eDate)) {
        alert('Input token and other details');
        return;
      }
      console.log("Fetching planes data...");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/aeroplane`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from, to, startDate:sDate, endDate:eDate },
        }
      );
      console.log("Planes data fetched successfully:", response.data.data);
      setTransportPlaneData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching planes data:", error.message || error.response?.data);
    }
  };

  const handleBusClick = async () => {
    // console.log("Bus button clicked!");
    // if (!from || !to) {
    //   console.error("From and To locations must be provided.");
    //   return;
    // }

    try {
      setNavButton("buses");
      const token = localStorage.getItem("token");
      const from = localStorage.getItem("from");
      const to = localStorage.getItem("to");
      const sDate = localStorage.getItem("startDate");
      const eDate = localStorage.getItem("endDate");
      if (!(token && from && to && sDate && eDate)) {
        alert('Input token and other details');
        return;
      }
      console.log("Fetching bus data...");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/bus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            from: "bangalore",
            to: "chennai",
            startDate: sDate,
            endDate: eDate,
          },
        }
      );
      console.log("Bus data fetched successfully:", response.data.data);
      setTransportBusesData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching bus data:", error.message || error.response?.data);
    }
  };

  const handleCartClick = () => {
    console.log("Cart icon clicked! Navigating to Cart...");
    navigate("cart"); // Navigate to the cart page when cart icon is clicked
  };

  return (
    <div className={styles.navbar}>
      <a
        href="#recommendation"
        onClick={() => {
          console.log("Recommendation clicked");
          setNavButton("recommendations");
          setPlaceType("recommendation");
        }}
      >
        Recommendation
      </a>
      <a
        href="#restaurants"
        onClick={() => {
          console.log("Restaurants clicked");
          setNavButton("restaurants");
          setPlaceType("restaurant");
        }}
      >
        Restaurants
      </a>
      <a
        href="#hotels"
        onClick={() => {
          console.log("Hotels clicked");
          setNavButton("hotels");
          setPlaceType("hotel");
        }}
      >
        Hotels
      </a>
      <a
        href="#attractions"
        onClick={() => {
          console.log("Attractions clicked");
          setNavButton("attractions");
          setPlaceType("tourist_attraction");
        }}
      >
        Attractions
      </a>
      <a
        href="#renting"
        onClick={() => {
          console.log("Renting clicked");
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
          <a href="#Buses" onClick={handleBusClick}>
            Buses
          </a>
          <a href="#Planes" onClick={handlePlaneClick}>
            Planes
          </a>
        </div>
      </div>

      {/* Cart Icon in the Navbar with a click event */}
      <div className={styles.cartIcon} onClick={handleCartClick}>
        <FaShoppingCart />
      </div>
    </div>
  );
}
