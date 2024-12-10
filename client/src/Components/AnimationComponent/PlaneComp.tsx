import styles from "./PlaneComp.module.css";

export default function PlaneComp() {
  return (
    <div className={styles.loader}>
      <div className={styles.plane}>
        <img
          src="https://zupimages.net/up/19/34/4820.gif"
          className={styles.planeImg}
          alt="loader"
        />
      </div>
    </div>
  );
}
