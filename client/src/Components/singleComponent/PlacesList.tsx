import { useState, useEffect } from "react";
import { Places } from "./Map";
import PlacesItem from "./PlacesItem";
import styles from "./PlacesList.module.css";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

interface PlacesListProps {
  places: Places[];
  selectedPlaces: string[];
  onSelectedPlacesChange: (selectedPlaces: string[]) => void;
  onAdd: () => void;
}

export default function PlacesList({ places, selectedPlaces, onSelectedPlacesChange, onAdd }: PlacesListProps) {
  const [currentSelected, setCurrentSelected] = useState<string[]>(selectedPlaces);
  const [sortedPlaces, setSortedPlaces] = useState<Places[]>(places);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setCurrentSelected(selectedPlaces);
  }, [selectedPlaces]);

  useEffect(() => {
    setSortedPlaces([...places]); // Sync sortedPlaces with incoming places
  }, [places]);

  const handleCheckboxToggle = (placeName: string, isChecked: boolean) => {
    const updatedSelection = isChecked
      ? [...currentSelected, placeName]
      : currentSelected.filter((name) => name !== placeName);

    setCurrentSelected(updatedSelection);
    onSelectedPlacesChange(updatedSelection);
  };

  const handleSort = () => {
    const sorted = [...sortedPlaces].sort((a, b) =>
      isAscending
        ? a.name.localeCompare(b.name) // Sort ascending
        : b.name.localeCompare(a.name) // Sort descending
    );
    setSortedPlaces(sorted);
    setIsAscending(!isAscending);
  };

  return (
    <>
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
    </>
  );
}
