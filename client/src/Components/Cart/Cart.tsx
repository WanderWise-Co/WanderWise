import React, { useState, useEffect } from "react";
import axios from "axios";
import Section from "./Section"; // Reusable section component
import styles from "./Cart.module.css";
import { Button } from "flowbite-react";

// Define the CategoryItem type
type CategoryItem = {
  category: "restaurant" | "hotel" | "attraction";
  location: string[]; // Array of locations (strings)
};

export default function Cart() {
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [hotels, setHotels] = useState<string[]>([]);
  const [attractions, setAttractions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        // Fetch data from the API (single request)
        const response = await axios.get<{ locations: CategoryItem[] }>(
          `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Segregate the locations based on category
        const restaurantsData = response.data.locations
          .filter((item) => item.category === "restaurant")
          .map((item) => item.location)
          .flat();

        const hotelsData = response.data.locations
          .filter((item) => item.category === "hotel")
          .map((item) => item.location)
          .flat();

        const attractionsData = response.data.locations
          .filter((item) => item.category === "attraction")
          .map((item) => item.location)
          .flat();

        // Update the state with the segregated data
        setRestaurants(restaurantsData);
        setHotels(hotelsData);
        setAttractions(attractionsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlegemini1 = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/gemini1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.overlay}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <div>
                <Section title="Restaurants" locations={restaurants} />
                <Section title="Hotels" locations={hotels} />
                <Section title="Attractions" locations={attractions} />
              </div>
            )}
          </div>
          <Button
          color="primary"
          className={styles.bottomRightButton}
          onClick={handlegemini1}
        >
          Create Plan &#8594;
        </Button>
        </div>
        
      </div>
    </>
  );
  
}
