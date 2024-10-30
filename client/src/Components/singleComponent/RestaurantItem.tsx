// RestaurantItem.tsx
export default function RestaurantItem({ restaurant }: any) {
  const { name, rating, price_level, photos, vicinity } = restaurant;

  // Log the restaurant details for debugging
  console.log("Restaurant details:", restaurant);

  // Construct the photo URL with a fallback
  const photoUrl =
    photos && photos.length > 0 && photos[0].photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      : "https://via.placeholder.com/400"; // Fallback image if no photo is available

  return (
    <div className="restaurant-item">
      <img src={photoUrl} alt={name} width="100" height="100" />
      <h3>{name}</h3>
      <p>Rating: {rating ? rating : "N/A"}</p>
      <p>Price Level: {price_level ? "$".repeat(price_level) : "N/A"}</p> {/* Display price level as dollar signs */}
      <p>Address: {vicinity}</p>
    </div>
  );
}
