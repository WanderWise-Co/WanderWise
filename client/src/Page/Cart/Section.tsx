import styles from "./Section.module.css";

// Define the props interface
interface SectionProps {
  title: string;
  locations: string[];
}

export default function Section({ title, locations }: SectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.locationList}>
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <li key={index} className={styles.locationItem}>
              {location}
            </li>
          ))
        ) : (
          <p>No locations available.</p>
        )}
      </ul>
    </div>
  );
}
