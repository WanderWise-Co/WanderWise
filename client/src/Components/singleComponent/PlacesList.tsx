import { Places } from "./Map";
import PlacesItem from "./PlacesItem";

interface PlacesListProps {
  places: Places[];
}

export default function PlacesList({ places }: PlacesListProps) {
  return (
    <div>
      {places.length > 0 ? (
        places.map((place) => <PlacesItem key={place.place_id} place={place} />)
      ) : (
        <p>No places found.</p>
      )}
    </div>
  );
}
