import styles from "./Navbar.module.css";

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
      <a href="#renting" aria-label="Renting" onClick={() => setPlaceType("rental")}>Renting</a>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn} aria-haspopup="true" aria-expanded="false">
          Buses/Planes
          <i className="fa fa-caret-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <a href="#link1">Link 1</a>
          <a href="#link2">Link 2</a>
          <a href="#link3">Link 3</a>
        </div>
      </div>
    </div>
  );
}
