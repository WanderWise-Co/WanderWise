import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import styles from "./Navbar.module.css";
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from "./UserDropdown";
import { useState } from "react";

interface NavbarProps {
  setPlaceType: (type: string) => void;
  setTransportPlaneData: (data: any) => void;
  setTransportPlaneRecoData: (data: any) => void;
  setTransportBusesData: (data: any) => void;
  setTransportBusesRecoData: (data: any) => void;
  setTransportRentalData: (data: any) => void;
  setGemeniData: (data: any) => void;
  setHotelRecoData: (data: any) => void;
  setNavButton: (data: string) => void;  // Accept the setter function
}

export default function Navbar({
  setPlaceType,
  setTransportPlaneData,
  setTransportPlaneRecoData,
  setTransportBusesData,
  setTransportBusesRecoData,
  setTransportRentalData,
  setGemeniData,
  setHotelRecoData,
  setNavButton,
}: NavbarProps) {

  const navigate = useNavigate(); // Initialize useNavigate
  const [activeButton, setActiveButton] = useState<string>('');
  // const [transportBusesData, setTransportBusesData] = useState(null);


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
      const reco_response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/recommendation/aeroreco`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("Planes Reco data",reco_response);
      setTransportPlaneRecoData(reco_response.data.data);
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

      console.log('fetching')
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
            from,
            to,
            startDate: sDate,
            endDate: eDate,
          },
        }
      );
      console.log("Bus data fetched successfully:", response.data.data);
      setTransportBusesData(response.data.data);
      const reco_response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/recommendation/busreco`,
        {
          headers: {
            Authorization: ` Bearer ${token} `,
          },
        }
      );
      console.log(reco_response);
      setTransportBusesRecoData(reco_response.data.data);   
    } catch (error: any) {
      console.error("Error fetching bus data:", error.message || error.response?.data);
    }
  };
 
  const handleRentalClick = async () => {
    console.log("try")
    try {
      const token = localStorage.getItem("token");
      const to = localStorage.getItem("to");

      console.log("try 1")
      console.log(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/rental`, token);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/rental`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },params:{to},
        }
      );
      console.log("Rental API Response:", response.data);
      setTransportRentalData(response.data.data); // Pass data to the parent
    } catch (error: any) {
      console.error("Error fetching rental data:", error.message || error.response?.data);
    }
  };
  
  

  const HandelRecoClick = async () => {
    // if (!from || !to) {
    //   console.error("From and To locations must be provided.");
    //   return;
    // }
    const token = localStorage.getItem("token");
    const from = localStorage.getItem("from");
    const to = localStorage.getItem("to");
    const sDate = localStorage.getItem("startDate");
    const eDate = localStorage.getItem("endDate");
    if (!(token && from && to && sDate && eDate)) {
      toast.error('Input token and other details');
      return;
    }

    try {
      // setNavButton("buses"); 
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/gemini`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { from,
            to,
            startDate:sDate,
            endDate:eDate},
        }
      );
      console.log(response.data)
      setGemeniData(response.data.data);

      const hotel_response = await axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/transport/hotel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            from,
            to,
            sDate,
            eDate,
          }
        }
      )  
      console.log(hotel_response);



      const selected_features = JSON.parse(localStorage.getItem('selected_features')||"[]");
      const reco_response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/recommendation/hotelreco`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {selected_features}
        }
      );
      console.log(reco_response.data)
      setHotelRecoData(reco_response.data);
            
    } catch (error: any) {
      console.error("Error fetching gimini data:", error.message || error.response?.data);
    }
  };

  const handleGoogleAPIClick = () =>{
    toast.success("Please select the places you want to visit")
  }
  const handleCartClick = () => {
    console.log("Cart icon clicked! Navigating to Cart...");
    navigate("cart"); // Navigate to the cart page when cart icon is clicked
  };

  return (
    <div className={styles.navbar}>
      <a
        href="#recommendation"
        className={activeButton === 'recommendation' ? styles.activeButton : ''}
        onClick={() => {
          console.log("Recommendation clicked");
          setNavButton("recommendations");
          setPlaceType("recommendation");
          HandelRecoClick();
          setActiveButton('recommendation');
        }}
      >
        Recommendation
      </a>
      <a
        href="#restaurants"
        className={activeButton === 'restaurant' ? styles.activeButton : ''}
        onClick={() => {
          console.log("Restaurants clicked");
          setNavButton("restaurant");
          setPlaceType("restaurant");
          handleGoogleAPIClick();
          setActiveButton('restaurant');
        }}
      >
        Restaurants
      </a>
      <a
        href="#hotels"
        className={activeButton === 'hotel' ? styles.activeButton : ''}
        onClick={() => {
          console.log("Hotels clicked");
          setNavButton("hotel");
          setPlaceType("hotel");
          handleGoogleAPIClick();
          setActiveButton('hotel');
        }}
      >
        Hotels
      </a>
      <a
        href="#attractions"
        onClick={() => {
          console.log("Attractions clicked");
          setNavButton("attraction");
          setPlaceType("tourist_attraction");
          handleGoogleAPIClick();
          setActiveButton('attraction');
        }}
        className={activeButton === 'attraction' ? styles.activeButton : ''}
      >
        Attractions
      </a>
      <a
        href="#renting"
        onClick={() => {
          console.log("Renting clicked");
          setNavButton("renting");
          setPlaceType("vehicle rental");
          handleRentalClick()
          setActiveButton('renting');
        }}
        className={activeButton === 'renting' ? styles.activeButton : ''}
      >
        Renting
      </a>

      <div className={styles.dropdown}>
        <a className={styles.dropbtn} >
          Travel
        </a>
        <div className={styles.dropdownContent}>
          <a href="#Buses" onClick={() => {handleBusClick();setActiveButton('travel');}} className={activeButton === 'buses' ? styles.activeButton : ''}>
            Buses
          </a>
          <a href="#Planes" onClick={() => {handlePlaneClick();setActiveButton('travel');}}  className={activeButton === 'planes' ? styles.activeButton : ''}>
            Planes
          </a>
        </div>
        
      </div>

      <div className={styles.cartIcon} onClick={handleCartClick}>
        <FontAwesomeIcon icon={faPlane} />
        </div>
      <div className={styles.profileIcon}>
      <UserDropdown />
      </div>
    </div>
  );
}
