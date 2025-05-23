import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDropdown.module.css";
import handleSignOut from "../Services/ProfilePage/SignOut";
import handleViewProfile from "../Services/ProfilePage/ProfilePage";
import { AppContext } from "../Hooks/AppProvider";

export default function UserDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { setNavButton } = useContext(AppContext);

  return (
    <div className={styles.dropdownContainer}>
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

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <a
            onClick={() => handleViewProfile(navigate)}
            className={`${styles.dropdownItem} ${styles.dropdownItemDark}`}
          >
            View Profile
          </a>
          <a
            onClick={() => handleSignOut(navigate, setNavButton)}
            className={`${styles.dropdownItem} ${styles.dropdownItemDark}`}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
