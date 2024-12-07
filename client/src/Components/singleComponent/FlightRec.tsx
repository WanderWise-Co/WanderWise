import styles from "./FlightRec.module.css";

interface Flight {
  airline: string;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: string;
  price: number;
  score: number;
}

interface FlightRecProps {
  flightrec: Flight[];
}

export default function FlightRec({ flightrec }: FlightRecProps) {
  if (!flightrec || flightrec.length === 0) {
    return (
      <div className={styles.noFlights}>
        <p>No recommended flights available.</p>
      </div>
    );
  }

  return (
    <div className={styles.flightRec}>
      <h2>Recommended Flights</h2>
      <ul className={styles.flightList}>
        {flightrec.map((flight, index) => (
          <li key={`flight-${index}`} className={styles.flightItem}>
            <div className={styles.flightHeader}>
              <h3>{flight.airline}</h3>
              <span>{flight.flight_number}</span>
            </div>
            <div className={styles.flightDetails}>
              <p>
                <strong>Departure:</strong> {flight.departure_time}
              </p>
              <p>
                <strong>Arrival:</strong> {flight.arrival_time}
              </p>
              <p>
                <strong>Duration:</strong> {flight.duration}
              </p>
              <p>
                <strong>Stops:</strong> {flight.stops}
              </p>
              <p>
                <strong>Price:</strong> ₹{flight.price.toLocaleString()}
              </p>
              <p>
                <strong>Score:</strong> {flight.score.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
