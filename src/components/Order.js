import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/Order.module.css"; // Import the CSS file
const URL = process.env.REACT_APP_API_URL;

const OrderIngestion = (props) => {
  const [orderData, setOrderData] = useState({
    customerId: "",
    amount: "",
  });
  const { setProgress } = props;
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(20);

    if (!orderData.customerId.trim() || !orderData.amount.trim()) {
      setError("Customer ID and Order Amount are required.");
      return;
    }
    setProgress(40);
    if (isNaN(orderData.amount) || Number(orderData.amount) <= 0) {
      setError("Order Amount must be a valid positive number.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/api/order`, orderData);
      setProgress(60);
      if (response.status === 200) {
        setSuccessMessage(
          "Order processed successfully! Order details have been sent to our processing system."
        );
        setOrderData({
          customerId: "",
          amount: "",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(
          err.response.data ||
            "The provided Customer ID is invalid. Please check and try again."
        );
      } else {
        setError("Please make sure the Customer ID is valid.");
      }
    }
    setProgress(100);
  };

  return (
    <div className={styles.container}>
      <h2>Order Data Ingestion</h2>

      {error && <div className={`${styles.alert} ${styles["alert-danger"]}`}>{error}</div>}
      {successMessage && (
        <div className={`${styles.alert} ${styles["alert-success"]}`}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="mx-2">
            Customer ID <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="customerId"
            value={orderData.customerId}
            onChange={handleChange}
            placeholder="Enter Customer ID"
            required
          />
        </div>
        <div>
          <label className="mx-2">
            Order Amount <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={orderData.amount}
            onChange={handleChange}
            placeholder="Enter Order Amount"
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderIngestion;
