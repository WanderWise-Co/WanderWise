import styles from "./BusListRec.module.css";
import PlaneComp from "../Page/AnimationComponent/PlaneComp"; // Import PlaneComp

// Update the Bus interface to include new fields
interface Bus {
  bus_name: string;
  rating: number;
  departure_time: string;
  departure_location: string;
  arrival_time: string;
  arrival_location: string;
  price: string;
}

interface BusRecProps {
  buses: Bus[];
}

export default function BusListRec({ buses }: BusRecProps) {
  return (
    <div className={styles.busListRec}>
      <h1 className={styles.title}>Recommended Buses</h1>
      {buses.length === 0 ? (
        <PlaneComp /> // Display PlaneComp if no buses
      ) : (
        <ul>
          {buses.map((bus, index) => (
            <li key={`${bus.bus_name}-rec-${index}`} className={styles.busItem}>
              <p>
                <strong>Name:</strong> {bus.bus_name}
              </p>
              <p>
                <strong>Rating:</strong> {bus.rating}
              </p>
              <p>
                <strong>Departure:</strong> {bus.departure_location} at{" "}
                {bus.departure_time}
              </p>
              <p>
                <strong>Arrival:</strong> {bus.arrival_location} at{" "}
                {bus.arrival_time}
              </p>
              <p>
                <strong>Price:</strong> ₹{bus.price}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
