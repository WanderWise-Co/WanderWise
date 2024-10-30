// Map.tsx
import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Define the type for a restaurant
interface Restaurant {
  place_id: string;
  name: string;
  rating: number;
  vicinity: string;
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
  width: "100%",
  height: "400px",
};

export default function Map({ coordinates, restaurants }: { coordinates: { lat: number, lng: number }, restaurants: Restaurant[] }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null); // Explicitly type state

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={14}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.place_id}
            position={{
              lat: restaurant.geometry.location.lat,
              lng: restaurant.geometry.location.lng,
            }}
            onClick={() => setSelectedRestaurant(restaurant)} // Set the clicked restaurant as the selected one
          />
        ))}

        {selectedRestaurant && (
          <InfoWindow
            position={{
              lat: selectedRestaurant.geometry.location.lat,
              lng: selectedRestaurant.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedRestaurant(null)} // Clear the selection when the InfoWindow is closed
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
