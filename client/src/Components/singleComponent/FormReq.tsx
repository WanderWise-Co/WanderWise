import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FormReq.module.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import beach from "../../assets/beach.jpeg";
import hill from "../../assets/hillstation.jpeg";
import temple from "../../assets/temple.webp";
import { isLoggedin } from "../../Utils/Auth";

const categories = [
  { id: 1, name: "Beaches", imgSrc: beach },
  { id: 2, name: "Mountains", imgSrc: hill },
  { id: 3, name: "Temple", imgSrc: temple },
];

const CategoryButton = ({ category, isSelected, onClick }: any) => (
  <button
    className={`${styles.categoryButton} ${isSelected ? styles.selected : ""}`}
    onClick={() => onClick(category.name)}
  >
    <img
      src={category.imgSrc}
      alt={category.name}
      className={`${styles.buttonImage} ${
        isSelected ? styles.selectedImage : ""
      }`}
    />
    <span>{category.name}</span>
  </button>
);

export default function FormReq() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryName)
        ? prevSelected.filter((cat) => cat !== categoryName)
        : [...prevSelected, categoryName]
    );
  };

  const handleChoosePlanClick = async () => {
    if (isLoggedin()) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: destination,
              key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            },
          }
        );

        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;

          navigate("/api/v1/planpage", {
            state: { coordinates: { lat, lng } },
          });
        } else {
          console.error("No results found for the specified location.");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    } else {
      navigate("/api/v1/auth/login");
    }
  };

  return (
    <div className={styles.imageContainer}>
      <h1 style={{ fontSize: "2rem", color: "#003d99", textAlign: "center" }}>
        Wander Wise
      </h1>
      <p style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: "2rem" }}>
        Craft Your Perfect Journey With Ease
      </p>
      <div className={styles.container}>
        <div className={styles.row}>
          <TextField
            id="outlined-basic"
            label="Source"
            variant="outlined"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={styles.inputField}
          />
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            placeholderText="Select From Date"
            className={styles.datepicker}
          />
        </div>

        <div className={styles.row}>
          <TextField
            id="outlined-basic"
            label="Destination"
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={styles.inputField}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select To Date"
            className={styles.datepicker}
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
