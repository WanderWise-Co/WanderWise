// Import the Restaurant interface from Map.tsx
import { Restaurant } from "./Map";
import RestaurantItem from "./RestaurantItem";
interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  console.log(restaurants)
  return (
    <>
    
    <div className="restaurant-list">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.place_id} restaurant={restaurant} />
        ))
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
    </>
    
  );
}
