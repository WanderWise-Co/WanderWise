import { useState } from "react";
import { Places } from "./Map";
import PlacesItem from "./PlacesItem";
import styles from "./PlacesList.module.css";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

interface PlacesListProps {
  places: Places[];
}

export default function PlacesList({ places }: PlacesListProps) {
  const [isAscending, setIsAscending] = useState(true);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]); // Store names instead of IDs

  const handleSort = () => {
    setIsAscending(!isAscending);
    // Add sorting logic here if necessary
  };

  const handleCheckboxToggle = (placeName: string, isChecked: boolean) => {
    setSelectedPlaces((prevSelected) =>
      isChecked
        ? [...prevSelected, placeName] // Add place name to the selected list
        : prevSelected.filter((name) => name !== placeName) // Remove place name from the selected list
    );
  };

  const handleAddButton = () => {
    console.log("Selected Place Names:", selectedPlaces);
  };

  return (
    <>
      <div className={styles.header}>
        <button className={styles.sortButton} onClick={handleSort}>
          Sort {isAscending ? "↑" : "↓"}
        </button>
        <Button onClick={handleAddButton} className={styles.addButton}>
          Add
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div>
        {places.length > 0 ? (
          places.map((place) => (
            <PlacesItem
              key={place.place_id}
              place={place}
              onCheckboxToggle={handleCheckboxToggle} // Pass the callback function
            />
          ))
        ) : (
          <p>No places found.</p>
        )}
      </div>
    </>
  );
}
