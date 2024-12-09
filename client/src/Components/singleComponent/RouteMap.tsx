import React, { useEffect, useRef } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 20.5937, // Default to India's lat, lng
  lng: 78.9629,
};

interface MapProps {
  source: string;
  destination: string;
}

const RouteMap: React.FC<MapProps> = ({ source, destination }) => {
  const mapRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && source && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      if (!directionsRendererRef.current) {
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
      }

      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && mapRef.current) {
            directionsRendererRef.current.setDirections(result);
            directionsRendererRef.current.setMap(mapRef.current);
          } else {
            console.error("Directions request failed due to: " + status);
          }
        }
      );
    }
  }, [isLoaded, source, destination]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    />
  );
};

export default RouteMap;
