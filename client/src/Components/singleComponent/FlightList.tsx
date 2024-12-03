import { useState, useEffect } from "react";
import styles from "./FlightList.module.css";

interface Flight {
  airline: string;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: string;
  price: string;
}

interface FlightsListProps {
  flights: Flight[];
}

export default function FlightsList({ flights }: FlightsListProps) {
  const [sortedFlights, setSortedFlights] = useState<Flight[]>(flights);
  const [isAscending, setIsAscending] = useState(true);
  const [sortField, setSortField] = useState<keyof Flight>("airline"); // Default sorting by airline

  useEffect(() => {
    setSortedFlights([...flights]);
  }, [flights]);

  const handleSort = (field: keyof Flight) => {
    const sorted = [...sortedFlights].sort((a, b) => {
      if (field === "price") {
        return isAscending
          ? parseInt(a.price) - parseInt(b.price) // Sorting by price as a number
          : parseInt(b.price) - parseInt(a.price);
      } else {
        return isAscending
          ? a[field].localeCompare(b[field]) // Sorting by string fields (e.g., airline, departure time)
          : b[field].localeCompare(a[field]);
      }
    });

    setSortedFlights(sorted);
    setIsAscending(!isAscending);
    setSortField(field); // Update the field being sorted
  };

 

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.sortButtons}>
          <button
            className={styles.sortButton}
            onClick={() => handleSort("airline")}
          >
            Sort by Airline {sortField === "airline" && (isAscending ? "↑" : "↓")}
          </button>
          <button
            className={styles.sortButton}
            onClick={() => handleSort("price")}
          >
            Sort by Price {sortField === "price" && (isAscending ? "↑" : "↓")}
          </button>
        </div>
      </div>
      <div>
        {sortedFlights.length > 0 ? (
          sortedFlights.map((flight, index) => (
            <div key={`${flight.flight_number}-${index}`} className={styles.flightItem}>
              <div className={styles.flightDetails}>
                <h4>{flight.airline} - {flight.flight_number}</h4>
                <p><strong>Departure:</strong> {flight.departure_time}</p>
                <p><strong>Arrival:</strong> {flight.arrival_time}</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p><strong>Stops:</strong> {flight.stops}</p>
                <p><strong>Price:</strong> ₹{flight.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
    </div>
  );
}
