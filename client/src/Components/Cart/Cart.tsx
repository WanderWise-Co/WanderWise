import React from "react";
import styles from "./Cart.module.css";

export default function Cart() {
  return (
    <div className={styles.container}>
      {/* Transparent overlay for displaying information */}
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>Your Cart</h1>
          <p>Add items to your cart and view details here.</p>
        </div>
      </div>
    </div>
  );
}
