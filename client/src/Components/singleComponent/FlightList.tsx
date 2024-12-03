import styles from "./FlightList.module.css";
// import { useState, useEffect } from "react";
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
  if (!flights || flights.length === 0) {
    return <p>No flights available.</p>;
  }

  return (
    <div className={styles.flightList}>
      {flights.map((flight, index) => (
        <div key={`${flight.flight_number}-${index}`} className={styles.flightItem}>
          <h4>{flight.airline}</h4>
          <p><strong>Flight Number:</strong> {flight.flight_number}</p>
          <p>
            <strong>Departure:</strong> {flight.departure_time} ({flight.departure_location})
          </p>
          <p>
            <strong>Arrival:</strong> {flight.arrival_time} ({flight.arrival_location})
          </p>
          <p><strong>Price:</strong> ₹{flight.price}</p>
        </div>
      ))}
    </div>
  );
}
