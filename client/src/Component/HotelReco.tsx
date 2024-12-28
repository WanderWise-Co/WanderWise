import PlaneComp from "../Page/AnimationComponent/PlaneComp";
import styles from "./HotelReco.module.css";

interface Hotel {
  Hotel_Name: string;
  Predicted_Rating: number;
}

interface HotelRecoProps {
  hotelreco: Hotel[] | null | undefined;
}

export default function HotelReco({ hotelreco }: HotelRecoProps) {
  console.log("HotelReco data:", hotelreco);

  return (
    <div className={styles.hotelReco}>
      <h2>Recommended Hotels</h2>
      {!Array.isArray(hotelreco) || hotelreco.length === 0 ? (
        <div className={styles.noHotels}>
          <PlaneComp />
        </div>
      ) : (
        <ul className={styles.hotelList}>
          {hotelreco.map((hotel, index) => (
            <li key={`hotel-${index}`} className={styles.hotelItem}>
              <h3>{hotel.Hotel_Name}</h3>
              <p>
                <strong>Predicted Rating:</strong>{" "}
                {hotel.Predicted_Rating.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
