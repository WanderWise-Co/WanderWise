import { useState, useEffect } from "react";
import Section from "./Section";
import styles from "./Cart.module.css";
import { Button } from "flowbite-react";
import PlaneComp from "../AnimationComponent/PlaneComp";
import fetchData from "../../Services/Cart/Cart";
import handlegemini1 from "../../Services/Cart/Handlegemini1";

export default function Cart() {
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [hotels, setHotels] = useState<string[]>([]);
  const [attractions, setAttractions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const data = await fetchData();
        setRestaurants(data.restaurants);
        setHotels(data.hotels);
        setAttractions(data.attractions);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.overlay}>
          {loading ? (
            <PlaneComp />
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
      </div>
      <Button color="primary" className={styles.btnbtn} onClick={handlegemini1}>
        Create Plan &#8594;
      </Button>
    </div>
  );
}
