import { useState, useEffect } from "react";
import { Places } from "./Map";
import PlacesItem from "./PlacesItem";
import styles from "./PlacesList.module.css";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";
import Map from "./Map";
import toast from "react-hot-toast";

interface PlacesListProps {
  places: Places[];
  coordinates: { lat: number; lng: number };
  setNavButton: string;
}

export default function PlacesList({
  places,
  coordinates,
  setNavButton,
}: PlacesListProps) {
  const [currentSelected, setCurrentSelected] = useState<string[]>([]);
  const [sortedPlaces, setSortedPlaces] = useState<Places[]>(places);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setSortedPlaces([...places]);
  }, [places]);

  const handleCheckboxToggle = (placeName: string, isChecked: boolean) => {
    setCurrentSelected((prev) => {
      if (isChecked) {
        return [...prev, placeName];
      } else {
        return prev.filter((name) => name !== placeName);
      }
    });
  };

  const handleSort = () => {
    const sorted = [...sortedPlaces].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setSortedPlaces(sorted);
    setIsAscending(!isAscending);
  };

  const onAdd = async () => {
    if (currentSelected.length === 0) {
      toast.error("List is empty. Please select at least one place to add.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const to = localStorage.getItem("to");
      const from = localStorage.getItem("from");
      console.log(setNavButton, currentSelected);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/planpage/cart`,
        {
          category: setNavButton,
          location: currentSelected,
          from,
          to,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentSelected([""]);

      console.log("Response from server:", response.data);
      toast.success("Places successfully added!");
    } catch (error: any) {
      console.error(
        "Error adding places:",
        error.message || error.response?.data
      );
      alert("Failed to add places. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.placesContainer}>
        <div className={styles.header}>
          <button className={styles.sortButton} onClick={handleSort}>
            Sort by Name {isAscending ? "↑" : "↓"}
          </button>
          <Button onClick={onAdd} className={styles.addButton}>
            Add
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div>
          {sortedPlaces.length > 0 ? (
            sortedPlaces.map((place) => (
              <PlacesItem
                key={place.place_id}
                place={place}
                isChecked={currentSelected.includes(place.name)}
                onCheckboxToggle={handleCheckboxToggle}
              />
            ))
          ) : (
            <p>No places found.</p>
          )}
        </div>
      </div>
      <div className={styles.mapContainer}>
        <Map coordinates={coordinates} places={places} />
      </div>
    </div>
  );
}
