// import { useState, useEffect } from "react";
// import styles from "./BusList.module.css";

// interface Bus {
//   bus_name: string;
//   rating: string;
//   departure_time: string;
//   departure_location: string;
//   arrival_time: string;
//   arrival_location: string;
//   price: string;
//   window_seats: string;
//   amenities: string[];
// }

// interface BusListProps {
//   buses: Bus[];
// }

// export default function BusList({ buses }: BusListProps) {
//   const [sortedBuses, setSortedBuses] = useState<Bus[]>([]);
//   console.log("Buses",buses);
  
//   useEffect(() => {
//     if (buses) {
//       setSortedBuses(buses);
//     }
//   }, [buses]);

  
//   if (!sortedBuses || sortedBuses.length === 0) {
//     return <p>No buses available.</p>;
//   }

//   return (
//     <div className={styles.busList}>
//       {sortedBuses.map((bus, index) => (
//         <div key={`${bus.bus_name}-${index}`} className={styles.busItem}>
//           <h4>{bus.bus_name}</h4>
//           <p><strong>Rating:</strong> {bus.rating}</p>
//           <p>
//             <strong>Departure:</strong> {bus.departure_time} ({bus.departure_location})
//           </p>
//           <p>
//             <strong>Arrival:</strong> {bus.arrival_time} ({bus.arrival_location})
//           </p>
//           <p><strong>Price:</strong> ₹{bus.price}</p>
//           <p><strong>Window Seats:</strong> {bus.window_seats}</p>
//           <p><strong>Amenities:</strong> {bus.amenities.join(", ")}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

//charan
import { useState, useEffect } from "react";
import styles from "./FlightList.module.css";

// interface Bus {
//     bus_name: string;
//     rating: string;
//     departure_time: string;
//     departure_location: string;
//     arrival_time: string;
//     arrival_location: string;
//     price: string;
//     window_seats: string;
//   }

// interface BusesListProps {
//   Buses: Bus[];
// }

// export default function BusesList({ Buses }: BusesListProps) {
//   const [sortedBuses, setSortedBuses] = useState<Bus[]>(Buses);
//   const [isAscending, setIsAscending] = useState(true);
//   const [sortField, setSortField] = useState<keyof Bus>("bus_name"); // Default sorting by airline

//   useEffect(() => {
//     setSortedBuses([...Buses]);
//   }, [Buses]);

//   const handleSort = (field: keyof Bus) => {
//     const sorted = [...sortedBuses].sort((a, b) => {
//       if (field === "price") {
//         return isAscending
//           ? parseInt(a.price) - parseInt(b.price) // Sorting by price as a number
//           : parseInt(b.price) - parseInt(a.price);
//       } else {
//         return isAscending
//           ? a[field].localeCompare(b[field]) // Sorting by string fields (e.g., airline, departure time)
//           : b[field].localeCompare(a[field]);
//       }
//     });

//     setSortedBuses(sorted);
//     setIsAscending(!isAscending);
//     setSortField(field); // Update the field being sorted
//   };

 

//   return (
//     <div>
//       <div className={styles.header}>
//         <div className={styles.sortButtons}>
//           <button
//             className={styles.sortButton}
//             onClick={() => handleSort("bus_name")}
//           >
//             Sort by Airline {sortField === "bus_name" && (isAscending ? "↑" : "↓")}
//           </button>
//           <button
//             className={styles.sortButton}
//             onClick={() => handleSort("price")}
//           >
//             Sort by Price {sortField === "price" && (isAscending ? "↑" : "↓")}
//           </button>
//         </div>
//       </div>
//       <div>
//         {sortedBuses.length > 0 ? (
//           sortedBuses.map((Bus, index) => (
//             // <div key={${flight.flight_number}-${index}} className={styles.flightItem}>
//             //   <div className={styles.flightDetails}>
//             //     <h4>{flight.airline} - {flight.flight_number}</h4>
//             //     <p><strong>Departure:</strong> {flight.departure_time}</p>
//             //     <p><strong>Arrival:</strong> {flight.arrival_time}</p>
//             //     <p><strong>Duration:</strong> {flight.duration}</p>
//             //     <p><strong>Stops:</strong> {flight.stops}</p>
//             //     <p><strong>Price:</strong> ₹{flight.price}</p>
//             //   </div>
//             // </div>
//             <div key={${Bus.bus_name}-${index}} className={styles.busItem}>
//             <div className={styles.busDetails}>
//                 <h4>{Bus.bus_name}</h4>
//                 <p><strong>Rating:</strong> {Bus.rating}</p>
//                 <p><strong>Departure:</strong> {Bus.departure_time} - {Bus.departure_location}</p>
//                 <p><strong>Arrival:</strong> {Bus.arrival_time} - {Bus.arrival_location}</p>
//                 <p><strong>Price:</strong> ₹{Bus.price}</p>
//                 <p><strong>Window Seats:</strong> {Bus.window_seats}</p>
//             </div>
//             </div>
//           ))
//         ) : (
//           <p>No Busses available.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import styles from "./FlightList.module.css";

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
        return isAscending
          ? parseInt(a.price) - parseInt(b.price)
          : parseInt(b.price) - parseInt(a.price);
      } else {
        return isAscending
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
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
      <div>
        {sortedBuses.length > 0 ? (
          <ul className={styles.busList}>
            {sortedBuses.map((bus, index) => (
              <li key={`${bus.bus_name}-${index}`} className={styles.busItem}>
                <div className={styles.busDetails}>
                  <h3>{bus.bus_name}</h3>
                  <p><strong>Rating:</strong> {bus.rating}</p>
                  <p>
                    <strong>Departure:</strong> {bus.departure_time} from{" "}
                    {bus.departure_location}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {bus.arrival_time} at{" "}
                    {bus.arrival_location}
                  </p>
                  <p><strong>Price:</strong> ₹{bus.price}</p>
                  <p><strong>Window Seats:</strong> {bus.window_seats}</p>
                  {/* <ul>
                    <strong>Amenities:</strong>
                    {bus.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul> */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No buses available.</p>
        )}
      </div>
 </div>
);
}
