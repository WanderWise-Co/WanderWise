// FormReq.tsx
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './FormReq.module.css';
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import beach from '../../assets/beach.jpeg';
import hill from '../../assets/hillstation.jpeg';
import temple from '../../assets/temple.webp';
import { isLoggedin } from '../../Utils/Auth';
import toast from "react-hot-toast";

const categories = [
  { id: 1, name: 'Beaches', imgSrc: beach },
  { id: 2, name: 'Mountains', imgSrc: hill },
  { id: 3, name: 'Temple', imgSrc: temple },
];

const CategoryButton = ({ category, isSelected, onClick }: any) => (
  <button
    className={`${styles.categoryButton} ${isSelected ? styles.selected : ''}`}
    onClick={() => onClick(category.name)}
  >
    <img
      src={category.imgSrc}
      alt={category.name}
      className={`${styles.buttonImage} ${isSelected ? styles.selectedImage : ''}`}
    />
    <span>{category.name}</span>
  </button>
);

export default function FormReq() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)), 
  });

  useEffect(()=>{
    if (source) {
      localStorage.setItem('from', source);
    }
    if (destination) {
      localStorage.setItem('to', destination);
    }
    if (date.startDate) {
      localStorage.setItem('startDate', date.startDate.toString());
    }
    if (date.endDate) {
      localStorage.setItem('endDate', date.endDate.toString());
    }
  },[source,destination,date])



  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryName)
        ? prevSelected.filter((cat) => cat !== categoryName)
        : [...prevSelected, categoryName]
    );
  };

  const handleChoosePlanClick = async () => {
    if (!destination) {
      toast.error("Destination cannot be empty.");
      return;
    }
    if (!source) {
      toast.error("Source cannot be empty.");
      return;
    }
    if (isLoggedin()) {
            
      try {
        const to = localStorage.getItem("to");
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: to,
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          },
        });
  
        if (response.data.status !== "OK" || response.data.results.length === 0) {
          console.error("Geocoding failed:", response.data.status);
          return;
        }
  
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log(lat,lng)
        if (lat && lng){
          localStorage.setItem('lat',lat);
          localStorage.setItem('lng',lng);
        }
        
        navigate(`/api/v1/homefilter`);
      } catch (error: any) {
        console.error("Error fetching location:", error.message);
      }
    } else {
      navigate("/api/v1/auth/login");
    }
  };

  const handleValueChange = (newValue: any) => {
    setDate(newValue);
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.headerContainer}>
        <h1>Wander Wise</h1>
        <h3>Craft Your Perfect Journey With Ease</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <input
            type="text"
            id="outlined-basic"
            name="source"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={`${styles.inputField} ${styles.smallInputField}`}
          />
        </div>

        <div className={styles.row}>
          <input
            type="text"
            name="Destination"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`${styles.inputField} ${styles.smallInputField}`}
          />
          <Datepicker
            value={date}
            onChange={handleValueChange}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={handleChoosePlanClick}>
            Choose plan
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.name)}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
 </div>
);
}