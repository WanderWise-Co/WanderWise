import { useState, useEffect } from "react";
import styles from "./CarRental.module.css";
import PlaneComp from "../AnimationComponent/PlaneComp";

interface CarRental {
  car_name: string;
  rating: string;
  location: string;
  phone_number: string;
  link: string;
}

interface CarRentalListProps {
  rentals: CarRental[];
}

export default function CarRentalList({ rentals }: CarRentalListProps) {
  const [sortedRentals, setSortedRentals] = useState<CarRental[]>(rentals);
  const [isAscending, setIsAscending] = useState(true);
  const [sortField, setSortField] = useState<keyof CarRental>("rating"); // Default sorting by rating

  useEffect(() => {
    setSortedRentals([...rentals]);
  }, [rentals]);

  const handleSort = (field: keyof CarRental) => {
    const sorted = [...sortedRentals].sort((a, b) => {
      if (field === "rating") {
        return isAscending
          ? parseFloat(a.rating) - parseFloat(b.rating) // Sorting by rating as a number
          : parseFloat(b.rating) - parseFloat(a.rating);
      } else {
        return isAscending
          ? a[field].localeCompare(b[field]) // Sorting by string fields (e.g., car_name, location)
          : b[field].localeCompare(a[field]);
      }
    });

    setSortedRentals(sorted);
    setIsAscending(!isAscending);
    setSortField(field);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.sortButtons}>
          <button
            className={styles.sortButton}
            onClick={() => handleSort("car_name")}
          >
            Sort by Name {sortField === "car_name" && (isAscending ? "↑" : "↓")}
          </button>
          <button
            className={styles.sortButton}
            onClick={() => handleSort("rating")}
          >
            Sort by Rating {sortField === "rating" && (isAscending ? "↑" : "↓")}
          </button>
        </div>
      </div>
      <div>
        {sortedRentals.length > 0 ? (
          sortedRentals.map((rental, index) => (
            <div
              key={`${rental.car_name}-${index}`}
              className={styles.carItem}
            >
              <div className={styles.carDetails}>
                <h4>{rental.car_name}</h4>
                <p><strong>Location:</strong> {rental.location}</p>
                <p><strong>Rating:</strong> {rental.rating}</p>
                <p><strong>Phone:</strong> {rental.phone_number}</p>
                <a
                  href={rental.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <PlaneComp/>
        )}
      </div>
    </div>
  );
}
