import { ChangeEvent, useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import handleSignUp from "../../Services/Signup/Signup";

/**
 * Signup component with name, email, and password fields.
 */
export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();

  /**
   * Updates userDetails state on input change.
   */
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Sign Up</h2>
        <div className={styles.inputContainer}>
          <input
            value={userDetails.userName}
            type="text"
            name="userName"
            placeholder="Enter name..."
            onChange={handleInputChange}
          />
          <input
            value={userDetails.userEmail}
            type="email"
            name="userEmail"
            placeholder="Enter email..."
            onChange={handleInputChange}
          />
          <div className={styles.passwordContainer}>
            <input
              value={userDetails.userPassword}
              type={showPassword ? "text" : "password"}
              name="userPassword"
              placeholder="Enter password..."
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button onClick={() => handleSignUp(userDetails, navigate)}>
            Sign Up
          </button>
        </div>
        <Link to="/api/v1/auth/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
