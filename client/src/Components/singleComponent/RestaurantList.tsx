// RestaurantList.tsx
import RestaurantItem from "./RestaurantItem";

export default function RestaurantList({ restaurants }: any) {
  return (
    <div className="restaurant-list">
      <h2>Nearby Restaurants</h2>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant: { place_id: any; }) => (
          <RestaurantItem key={restaurant.place_id} restaurant={restaurant} />
        ))
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
}
