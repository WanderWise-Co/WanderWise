import styles from "./HotelReco.module.css";

interface Hotel {
  Hotel_Name: string;
  Predicted_Rating: number;
}

interface HotelRecoProps {
  hotelreco: Hotel[] | null | undefined;
}

export default function HotelReco({ hotelreco }: HotelRecoProps) {
  // Check if hotelreco is valid and log for debugging
  console.log("HotelReco data:", hotelreco);

  if (!Array.isArray(hotelreco) || hotelreco.length === 0) {
    return (
      <div className={styles.noHotels}>
        <p>No recommended hotels available.</p>
      </div>
    );
  }

  return (
    <div className={styles.hotelReco}>
      <h2>Recommended Hotels</h2>
      <ul className={styles.hotelList}>
        {hotelreco.map((hotel, index) => (
          <li key={`hotel-${index}`} className={styles.hotelItem}>
            <h3>{hotel.Hotel_Name}</h3>
            <p>
              <strong>Predicted Rating:</strong> {hotel.Predicted_Rating.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
