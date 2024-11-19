// Import the Place interface from Map.tsx
import { Places } from "./Map";
import styles from "./PlacesItem.module.css";
import { Button } from "flowbite-react";

interface PlacesProps {
  place: Places;
}

export default function PlaceItem({ place }: PlacesProps) {
  const { name, rating, price_level, photos, vicinity } = place;

  // Construct the photo URL with a fallback
  const photoUrl =
    photos && photos.length > 0 && photos[0].photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      : "https://via.placeholder.com/400"; // Fallback image if no photo is available

  return (
    <div className={styles.placeItem}>
      <img src={photoUrl} alt={name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.h3}>{name}</h3>
          <Button pill className={styles.buttonTopRight}>Add</Button>
        </div>
        <p>Rating: {rating ? rating : "N/A"}</p>
        <p>Price Level: {price_level ? "$".repeat(price_level) : "N/A"}</p>
        <p>Address: {vicinity}</p>
      </div>
    </div>
  );
}
