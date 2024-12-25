import { useState, useEffect } from "react";
import axios from "axios";
import Section from "./Section"; // Reusable section component
import styles from "./Cart.module.css";
import { Button } from "flowbite-react";
import PlaneComp from "../AnimationComponent/PlaneComp";

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
        const to = localStorage.getItem("to");
        const from = localStorage.getItem("from");

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              to,
              from,
            },
          }
        );

        // Extract userPreferences and segregate by category
        const userPreferences = response.data.userPreferences;

        const restaurantsData = userPreferences
          .filter((item: CategoryItem) => item.category === "restaurant")
          .map((item: CategoryItem) => item.location)
          .flat();

        const hotelsData = userPreferences
          .filter((item: CategoryItem) => item.category === "hotel")
          .map((item: CategoryItem) => item.location)
          .flat();

        const attractionsData = userPreferences
          .filter((item: CategoryItem) => item.category === "attraction")
          .map((item: CategoryItem) => item.location)
          .flat();

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
      const to = localStorage.getItem("to");
      const from = localStorage.getItem("from");
      const startDate = localStorage.getItem("startDate");
      const endDate = localStorage.getItem("endDate");
      const response = await axios
        .get(`${import.meta.env.VITE_BASE_SERVER_URL}/planpage/gemini2`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            from,
            to,
            startDate,
            endDate,
          },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "TravelPlan.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });

      console.log(response);
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.overlay}>
          {loading ? (
            <PlaneComp/>
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
  );
}
