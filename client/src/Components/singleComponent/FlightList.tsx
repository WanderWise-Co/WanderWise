import { useState, useEffect } from "react";
import styles from "./FlightList.module.css";
import PlaneComp from "../AnimationComponent/PlaneComp";

interface Flight {
  airline: string;
  flight_number: string;
  departure_time: string;
  departure_location: string;
  arrival_time: string;
  arrival_location: string;
  price: string;
}

interface FlightsListProps {
  flights: Flight[];
}

export default function FlightsList({ flights }: FlightsListProps) {
  const [sortedFlights, setSortedFlights] = useState<Flight[]>(flights);
  const [isAscending, setIsAscending] = useState(true);
  const [sortField, setSortField] = useState<keyof Flight>("airline");

  useEffect(() => {
    setSortedFlights([...flights]);
  }, [flights]);

  const handleSort = (field: keyof Flight) => {
    const sorted = [...sortedFlights].sort((a, b) => {
      if (field === "price") {
        return isAscending
          ? parseInt(a.price) - parseInt(b.price)
          : parseInt(b.price) - parseInt(a.price);
      } else {
        return isAscending
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });

    setSortedFlights(sorted);
    setIsAscending(!isAscending);
    setSortField(field);
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
      <h2> Flights</h2>
        {sortedFlights.length > 0 ? (
          <ul className={styles.flightList}>
            {sortedFlights.map((flight, index) => (
              <li key={`${flight.flight_number}-${index}`} className={styles.flightItem}>
                <div className={styles.flightDetails}>
                  <h4>{flight.airline}</h4>
                  <p><strong>Flight Number:</strong> {flight.flight_number}</p>
                  <p>
                    <strong>Departure:</strong> {flight.departure_time} from{" "}
                    {flight.departure_location}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {flight.arrival_time} at{" "}
                    {flight.arrival_location}
                  </p>
                  <p><strong>Price:</strong> ₹{flight.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <PlaneComp/>
        )}
      </div>
    </div>
  );
}
