import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDropdown.module.css";

export default function UserDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleViewProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/`
      );
      navigate("/api/v1/profilepage");
    } catch (error) {
      console.log("Error in UserDropdown to Profile (token)", error);
    }
  };

  const handleSignOut = () => {
    localStorage.clear()
    navigate("/api/v1/home");
  };

  return (
    <div className={styles.dropdownContainer}>
      {/* Avatar Button to toggle dropdown */}
      <div className={styles.avatarButton} onClick={toggleDropdown}>
        <svg
          className={styles.avatarIcon}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div>
            <a
              onClick={handleViewProfile}
              className={`${styles.dropdownItem} ${styles.dropdownItemDark}`}
            >
              View Profile
            </a>
            <a
              onClick={handleSignOut}
              className={`${styles.dropdownItem} ${styles.dropdownItemDark}`}
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
