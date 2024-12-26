import { useState, useEffect } from "react";
import styles from "./BusList.module.css";
import PlaneComp from "../Page/AnimationComponent/PlaneComp";

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

interface BusesListProps {
  Buses: Bus[];
}

export default function BusesList({ Buses }: BusesListProps) {
  const [sortedBuses, setSortedBuses] = useState<Bus[]>(Buses);
  const [isAscending, setIsAscending] = useState(true);
  const [sortField, setSortField] = useState<keyof Bus>("bus_name");

  useEffect(() => {
    setSortedBuses([...Buses]);
  }, [Buses]);

  const handleSort = (field: keyof Bus) => {
    const sorted = [...sortedBuses].sort((a, b) => {
      if (field === "price") {
        // Sort numeric fields like price
        return isAscending
          ? parseInt(a.price) - parseInt(b.price)
          : parseInt(b.price) - parseInt(a.price);
      } else if (typeof a[field] === "string" && typeof b[field] === "string") {
        // Sort string fields
        return isAscending
          ? (a[field] as string).localeCompare(b[field] as string)
          : (b[field] as string).localeCompare(a[field] as string);
      } else if (Array.isArray(a[field]) && Array.isArray(b[field])) {
        // Optional: Define how to sort array fields like amenities (e.g., by length)
        return isAscending
          ? a[field].length - b[field].length
          : b[field].length - a[field].length;
      } else {
        return 0; // Default: no sorting for unsupported fields
      }
    });

    setSortedBuses(sorted);
    setIsAscending(!isAscending);
    setSortField(field);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.sortButtons}>
          <button
            className={styles.sortButton}
            onClick={() => handleSort("bus_name")}
          >
            Sort by Name {sortField === "bus_name" && (isAscending ? "↑" : "↓")}
          </button>
          <button
            className={styles.sortButton}
            onClick={() => handleSort("price")}
          >
            Sort by Price {sortField === "price" && (isAscending ? "↑" : "↓")}
          </button>
        </div>
      </div>
      <h1 className={styles.title}>Buses List</h1>
      <div>
        {sortedBuses.length > 0 ? (
          <ul className={styles.busList}>
            {sortedBuses.map((bus, index) => (
              <li key={`${bus.bus_name}-${index}`} className={styles.busItem}>
                <div className={styles.busDetails}>
                  <h3>{bus.bus_name}</h3>
                  <p>
                    <strong>Rating:</strong> {bus.rating}
                  </p>
                  <p>
                    <strong>Departure:</strong> {bus.departure_time} from{" "}
                    {bus.departure_location}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {bus.arrival_time} at{" "}
                    {bus.arrival_location}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{bus.price}
                  </p>
                  <p>
                    <strong>Window Seats:</strong> {bus.window_seats}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <PlaneComp />
        )}
      </div>
    </div>
  );
}
