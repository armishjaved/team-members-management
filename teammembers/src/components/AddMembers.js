import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMembers = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        role: "regular",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/team-members/", formData)
            .then(() => navigate("/"))
            .catch((error) => {
                if (error.response && error.response.data.email) {
                    setError(error.response.data.email[0]); //email error
                } else {
                    console.error("Error adding team member:", error);
                }
            });
    };
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>Add a Team Member</h2>
                <p style={styles.subtitle}>Set email, location, and role.</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label>First Name</label>
                        <input
                            name="first_name"
                            placeholder="Enter first name"
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Last Name</label>
                        <input
                            name="last_name"
                            placeholder="Enter last name"
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Phone Number</label>
                        <input
                            name="phone_number"
                            placeholder="Enter phone number"
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />

                    </div>

                    <div style={styles.formGroup}>
                        <label>Email</label>
                        <input
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    {error && <p style={styles.error}>{error}</p>} {/* Show error if exists */}

                    <div style={styles.formGroup}>
                        <label>Role</label>
                        <select name="role" onChange={handleChange} style={styles.select}>
                            <option value="regular">Regular - Can’t delete members</option>
                            <option value="admin">Admin - Can delete members</option>
                        </select>
                    </div>

                    <button type="submit" style={styles.saveButton}>Save</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    container: {
      width: "400px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "12px", 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "5px",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "14px",
      color: "#777",
      marginBottom: "15px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "12px",
    },
    input: {
      width: "88%",
      height: "20px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      fontSize: "16px",
      backgroundColor: "#fafafa",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)",
    },
    select: {
      width: "95%",
      height: "45px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      fontSize: "16px",
      backgroundColor: "#fafafa",
      outline: "none",
      appearance: "none",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)",
    },
    inputPlaceholder: {
      color: "#aaa",
    },
    saveButton: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "12px",
      fontSize: "16px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "15px",
      transition: "background-color 0.2s",
    },
    saveButtonHover: {
      backgroundColor: "#0056b3",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginTop: "5px",
      textAlign: "center",
    },
  };
  


export default AddMembers;