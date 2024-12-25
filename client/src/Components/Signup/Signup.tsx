// Signup.tsx
import React, { ChangeEvent, useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../Utils/Reg";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const [userDetails, setuserDetails] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  function handleInputChage(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setuserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSignUp = async () => {
    if (!emailRegex.test(userDetails.userEmail)) {
      toast.error("Please enter a valid username ");
      return;
    }
    if (!emailRegex.test(userDetails.userEmail)) {
      toast.error("Please enter a valid email ");
      return;
    }
    if (!passwordRegex.test(userDetails.userPassword)) {
      toast.error("Please enter a valid password ");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
        userDetails
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    toast.success("FORM SUBMITED");
  };

  const [showPassword, setshowPassword] = useState(false);

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
            onChange={handleInputChage}
          />
          <input
            value={userDetails.userEmail}
            type="email"
            name="userEmail"
            placeholder="Enter email..."
            onChange={handleInputChage}
          />
          <div className={styles.passwordContainer}>
            <input
              value={userDetails.userPassword}
              type={showPassword ? "text" : "password"}
              name="userPassword"
              placeholder="Enter password..."
              onChange={handleInputChage}
            />
            <button
              onClick={() => {
                setshowPassword(!showPassword);
              }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <Link to="/api/v1/auth/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
