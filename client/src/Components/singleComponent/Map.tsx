import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

export interface Places {
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
  width: "100%",
  height: "100%",
};

export default function Map({
  coordinates,
  places,
}: {
  coordinates: { lat: number; lng: number };
  places: Places[];
}) {
  const [selectedPlaces, setSelectedPlaces] = useState<Places | null>(null);

  console.log("cordi",coordinates,places);
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={coordinates} zoom={14}>
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            onClick={() => setSelectedPlaces(place)}
          />
        ))}

        {selectedPlaces && (
          <InfoWindow
            position={{
              lat: selectedPlaces.geometry.location.lat,
              lng: selectedPlaces.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedPlaces(null)}
          >
            <div>
              
              <h3>{selectedPlaces.name}</h3>
              <p>Rating: {selectedPlaces.rating}</p>
              <p>{selectedPlaces.vicinity}</p>
              {selectedPlaces.photos && selectedPlaces.photos.length > 0 && (
                <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedPlaces.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
                alt={selectedPlaces.name}
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
