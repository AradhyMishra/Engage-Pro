import React from "react";
import googleIcon from "./google.png";
import styles from "./LoginPage.module.css";

const URL = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const googleAuth = (e) => {
    e.preventDefault();
    window.open(`${URL}/auth/google/callback`, "_self"); // Open in the same tab
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Engage Pro</h1>
        <p className={styles.subtitle}>
          Your CRM solution to drive better engagement.
        </p>
        <button className={styles.googleButton} onClick={googleAuth}>
          <img
            src={googleIcon}
            alt="Google Icon"
            className={styles.googleIcon}
          />
          Sign in with Google
        </button>
        <p className={styles.terms}>
          By signing in, you agree to our{" "}
          <a href="/" className={styles.link}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/" className={styles.link}>
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
