// Import the Restaurant interface from Map.tsx
import { Restaurant } from "./Map";
import PlacesItem from "./PlacesItem";
interface RestaurantListProps {
  places: Restaurant[];
}

export default function PlacesList({ places }: PlacesListProps) {
  console.log(places)
  return (
    <>
    
    <div className="restaurant-list">
      {places.length > 0 ? (
        places.map((restaurant) => (
          <PlacesItem key={restaurant.place_id} restaurant={restaurant} />
        ))
      ) : (
        <p>No places found.</p>
      )}
    </div>
    </>
    
  );
}
