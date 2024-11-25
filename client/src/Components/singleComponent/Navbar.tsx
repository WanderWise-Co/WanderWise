import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";

interface NavbarProps {
  setPlaceType: (type: string) => void;
}

export default function Navbar({ setPlaceType }: NavbarProps) {
  return (
    <div className={styles.navbar}>
      <a href="#recommendation" aria-label="Recommendation">Recommendation</a>
      <a href="#restaurants" aria-label="Restaurants" onClick={() => setPlaceType("restaurant")}>Restaurants</a>
      <a href="#hotels" aria-label="Hotels" onClick={() => setPlaceType("hotel")}>Hotels</a>
      <a href="#attractions" aria-label="Attractions" onClick={() => setPlaceType("tourist_attraction")}>Attractions</a>
      <a href="#renting" aria-label="Renting" onClick={() => setPlaceType("vehicle rental")}>Renting</a>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn} aria-haspopup="true" aria-expanded="false">
          Travel
          <i className="fa fa-caret-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <a href="#link1">Buses</a>
          <a href="#link2">Planes</a>
        </div>
      </div>

      <div className={styles.cartIcon}>
        <FaShoppingCart className={styles.cart} />
      </div>
    </div>
  );
}
