import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Export the Restaurant interface
export interface Restaurant {
  place_id: string;
  name: string;
  rating: number;
  vicinity: string;
  price_level?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: {
    photo_reference: string;
  }[];
}

const mapContainerStyle = {
  flex: 3,
  padding: "20px",
  backgroundColor: "#fff", // Correct background-color to backgroundColor
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

export default function Map({
  coordinates,
  restaurants,
}: {
  coordinates: { lat: number; lng: number };
  restaurants: Restaurant[];
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={coordinates} zoom={14}>
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.place_id}
            position={{
              lat: restaurant.geometry.location.lat,
              lng: restaurant.geometry.location.lng,
            }}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}

        {selectedRestaurant && (
          <InfoWindow
            position={{
              lat: selectedRestaurant.geometry.location.lat,
              lng: selectedRestaurant.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <div>
              <h3>{selectedRestaurant.name}</h3>
              <p>Rating: {selectedRestaurant.rating}</p>
              <p>{selectedRestaurant.vicinity}</p>
              {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedRestaurant.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
                  alt={selectedRestaurant.name}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
