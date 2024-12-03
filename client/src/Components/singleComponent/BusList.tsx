import { useState, useEffect } from "react";
import styles from "./BusList.module.css";

interface Bus {
  bus_name: string;
  rating: string;
  departure_time: string;
  departure_location: string;
  arrival_time: string;
  arrival_location: string;
  price: string;
  window_seats: string;
  amenities: string[];
}

interface BusListProps {
  buses: Bus[];
}

export default function BusList({ buses }: BusListProps) {
  const [sortedBuses, setSortedBuses] = useState<Bus[]>([]);

  useEffect(() => {
    if (buses) {
      setSortedBuses(buses);
    }
  }, [buses]);

  if (!sortedBuses || sortedBuses.length === 0) {
    return <p>No buses available.</p>;
  }

  return (
    <div className={styles.busList}>
      {sortedBuses.map((bus, index) => (
        <div key={`${bus.bus_name}-${index}`} className={styles.busItem}>
          <h4>{bus.bus_name}</h4>
          <p><strong>Rating:</strong> {bus.rating}</p>
          <p>
            <strong>Departure:</strong> {bus.departure_time} ({bus.departure_location})
          </p>
          <p>
            <strong>Arrival:</strong> {bus.arrival_time} ({bus.arrival_location})
          </p>
          <p><strong>Price:</strong> ₹{bus.price}</p>
          <p><strong>Window Seats:</strong> {bus.window_seats}</p>
          <p><strong>Amenities:</strong> {bus.amenities.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
