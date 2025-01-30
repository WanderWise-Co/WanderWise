import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlane } from "@fortawesome/free-solid-svg-icons";
import UserDropdown from "./UserDropdown";
import { useState, useContext } from "react";
import handlePlaneClick from "../Services/PlanPage/Planes";
import handleBusClick from "../Services/PlanPage/Buses";
import handleRentalClick from "../Services/PlanPage/Rental";
import handleRecoClick from "../Services/PlanPage/Recommendation";
import { AppContext } from "../Hooks/AppProvider";

export default function Navbar() {
  const {
    setPlaceType,
    setTransportPlaneData,
    setTransportPlaneRecoData,
    setTransportBusesData,
    setTransportBusesRecoData,
    setTransportRentalData,
    setGemeniData,
    setHotelRecoData,
    setNavButton,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleGoogleAPIClick = () => {
    toast.info("Please select the places you want to visit");
  };

  return (
    <div className={styles.navbar}>
      <button className={styles.menu_toggle} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`${styles.navbarLinks} ${menuOpen ? styles.active : ""}`}>
        <a
          href="#recommendation"
          className={
            activeButton === "recommendation" ? styles.activeButton : ""
          }
          onClick={() => {
            setNavButton("recommendations");
            setPlaceType("recommendation");
            setActiveButton("recommendation");
            handleRecoClick(setGemeniData, setHotelRecoData);
          }}
        >
          Recommendation
        </a>
        <a
          href="#restaurants"
          className={activeButton === "restaurant" ? styles.activeButton : ""}
          onClick={() => {
            setNavButton("restaurant");
            setPlaceType("restaurant");
            setActiveButton("restaurant");
            handleGoogleAPIClick();
          }}
        >
          Restaurants
        </a>
        <a
          href="#hotels"
          className={activeButton === "hotel" ? styles.activeButton : ""}
          onClick={() => {
            setNavButton("hotel");
            setPlaceType("hotel");
            setActiveButton("hotel");
            handleGoogleAPIClick();
          }}
        >
          Hotels
        </a>
        <a
          href="#attractions"
          className={activeButton === "attraction" ? styles.activeButton : ""}
          onClick={() => {
            setNavButton("attraction");
            setPlaceType("tourist_attraction");
            setActiveButton("attraction");
            handleGoogleAPIClick();
          }}
        >
          Attractions
        </a>
        <a
          href="#renting"
          className={activeButton === "renting" ? styles.activeButton : ""}
          onClick={() => {
            setNavButton("renting");
            setPlaceType("vehicle rental");
            setActiveButton("renting");
            handleRentalClick(setTransportRentalData);
          }}
        >
          Renting
        </a>
        <div className={styles.dropdown}>
          <a className={styles.dropbtn}>Travel</a>
          <div className={styles.dropdownContent}>
            <a
              href="#Buses"
              onClick={() => {
                setNavButton("buses");
                handleBusClick(
                  setTransportBusesData,
                  setTransportBusesRecoData
                );
                setActiveButton("buses");
              }}
            >
              Buses
            </a>
            <a
              href="#Planes"
              onClick={() => {
                setNavButton("planes");
                handlePlaneClick(
                  setTransportPlaneData,
                  setTransportPlaneRecoData
                );
                setActiveButton("planes");
              }}
            >
              Planes
            </a>
          </div>
        </div>
      </div>
      <div className={styles.cartIcon} onClick={() => navigate("cart")}>
        <FontAwesomeIcon icon={faPlane} />
      </div>
      <div className={styles.profileIcon}>
        <UserDropdown />
      </div>
    </div>
  );
}
