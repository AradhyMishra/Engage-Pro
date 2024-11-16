import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/Customer.module.css"; 
const URL = process.env.REACT_APP_API_URL;

const Customer = (props) => {
  const { setProgress } = props;

  const [customerData, setCustomerData] = useState({
    name: "",
    age: "",
    email: "",
    visits: "",
    netSpend: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(20);

    if (!customerData.name.trim() || !customerData.email.trim()) {
      setError("Name and Email are required.");
      return;
    }
    setProgress(40);
    try {
      const response = await axios.post(`${URL}/api/customer`, customerData);
      if (response.status === 200) {
        setSuccessMessage("Customer added successfully!");
        setCustomerData({
          name: "",
          age: "",
          email: "",
          visits: "",
          netSpend: "",
        });
        setProgress(70);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message || "Error adding customer.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setProgress(70);
    }
    setProgress(100);
  };

  return (
    <div className={styles.container}>
      <h2>Customer Data Ingestion</h2>

      {error && <div className={`${styles.alert} ${styles["alert-danger"]}`}>{error}</div>}
      {successMessage && (
        <div className={`${styles.alert} ${styles["alert-success"]}`}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={customerData.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>
        <div className="form-group">
          <label>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Visits</label>
          <input
            type="number"
            className="form-control"
            name="visits"
            value={customerData.visits}
            onChange={handleChange}
            placeholder="Enter number of visits"
          />
        </div>
        <div className="form-group">
          <label>Net Spend</label>
          <input
            type="number"
            className="form-control"
            name="netSpend"
            value={customerData.netSpend}
            onChange={handleChange}
            placeholder="Enter net spend"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default Customer;
