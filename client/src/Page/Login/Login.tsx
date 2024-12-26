import { ChangeEvent, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import handleLogin from "../../Services/Login/Login";
import useHandleContinueWithGoogle from "../../Services/Login/HandleContinueWithGoogle";

/**
 * Login component with email/password and Google login.
 */
export default function Login() {
  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();
  const handleGoogleLogin = useHandleContinueWithGoogle(navigate);

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
        <h2>Login</h2>
        <div className={styles.social}>
          <div onClick={() => handleGoogleLogin()}>
            <GoogleLoginButton />
          </div>
        </div>
        <div className={styles.inputContainer}>
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
          <button onClick={() => handleLogin(userDetails, navigate)}>
            Login
          </button>
        </div>
        <div className={styles.footer}>
          <Link to="/api/v1/auth/register">Don't have an account? Sign Up</Link>
          <Link to="/api/v1/auth/forgotpassword">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}
