import React, { useState, useEffect } from "react";
import PlaneComp from "../AnimationComponent/PlaneComp";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
   
  const [user, setUser] = useState(null);
  const [travelHistory, setTravelHistory] = useState([]);

  return (
    <PlaneComp/>
    // <div className={styles.profileContainer}>
    //   {user ? (
    //     <div className={styles.userDetails}>
    //       <h2 className={styles.sectionTitle}>User Profile</h2>
    //       <div className={styles.details}>
    //         <div className={styles.info}>
    //           <p><strong>Name:</strong> {user.name}</p>
    //           <p><strong>Email:</strong> {user.email}</p>
    //           <p><strong>Phone:</strong> {user.phone}</p>
    //           <p><strong>Address:</strong> {user.address}</p>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <PlaneComp />
    //   )}

    //   {/* Travel History Section */}
    //   <div className={styles.travelHistory}>
    //     <h2 className={styles.sectionTitle}>Your Travel History</h2>
    //     {travelHistory.length > 0 ? (
    //       <ul className={styles.historyList}>
    //         {travelHistory.map((entry, index) => (
    //           <li key={index} className={styles.historyItem}>
    //             <p><strong>Destination:</strong> {entry.destination}</p>
    //             <p><strong>Date:</strong> {entry.date}</p>
    //             <p><strong>Notes:</strong> {entry.notes}</p>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p className={styles.noHistory}>You have no travel history recorded.</p>
    //     )}
    //   </div>
    // </div>
  );
}
