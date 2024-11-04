// Import the Restaurant interface from Map.tsx
import { Restaurant } from "./Map";
import RestaurantItem from "./RestaurantItem";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div className="restaurant-list">
      <h2>Nearby Restaurants</h2>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.place_id} restaurant={restaurant} />
        ))
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
}
