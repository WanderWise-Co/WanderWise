// Import the Restaurant interface from Map.tsx
import { Restaurant } from "./Map";
import styles from "./RestaurantItem.module.css";

interface RestaurantProps {
  restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: RestaurantProps) {
  const { name, rating, price_level, photos, vicinity } = restaurant;

  // Log the restaurant details for debugging
  console.log("Restaurant details:", restaurant);

  // Construct the photo URL with a fallback
  const photoUrl =
    photos && photos.length > 0 && photos[0].photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      : "https://via.placeholder.com/400"; // Fallback image if no photo is available

  return (
    <div className={styles.restaurantItem}>
      <img src={photoUrl} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.h3}>{name}</h3>
        <p>Rating: {rating ? rating : "N/A"}</p>
        <p>Price Level: {price_level ? "$".repeat(price_level) : "N/A"}</p>
        <p>Address: {vicinity}</p>
      </div>
    </div>
  );
}
