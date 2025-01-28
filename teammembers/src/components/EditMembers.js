import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMembers = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        role: "regular",
    });

    const [error, setError] = useState(""); //error

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/team-members/${id}/`)
            .then((response) => setFormData(response.data))
            .catch((error) => console.error("Error fetching team member:", error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");}

        const handleSubmit = (e) => {
            e.preventDefault();
            axios
                .put(`http://127.0.0.1:8000/api/team-members/${id}/`, formData)
                .then(() => navigate("/"))
                .catch((error) => {
                    if (error.response && error.response.data.email) {
                        setError(error.response.data.email[0]); //email error
                    } else {
                        console.error("Error updating team member:", error);
                    }
                });
        };

        const handleDelete = () => {
            axios
                .delete(`http://127.0.0.1:8000/api/team-members/${id}/`)
                .then(() => navigate("/"))
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        setError("Only admins can delete team members.");  //delete error
                    } else if (error.response && error.response.status === 401) {
                        setError("You must be logged in to delete.");
                    } else {
                        console.error("Error deleting team member:", error);
                    }
                });
        };

        return (
            <div style={styles.page}>
                <div style={styles.container}>
                    <h2 style={styles.title}>Edit Team Member</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label>First Name</label>
                            <input name="first_name" value={formData.first_name} onChange={handleChange} required style={styles.input} />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Last Name</label>
                            <input name="last_name" value={formData.last_name} onChange={handleChange} required style={styles.input} />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Phone Number</label>
                            <input name="phone_number" value={formData.phone_number} onChange={handleChange} required style={styles.input} />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} required style={styles.input} />
                        </div>

                        {error && <p style={styles.error}>{error}</p>} {/* Show error if exists */}

                        <div style={styles.formGroup}>
                            <label>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
                                <option value="regular">Regular - Can’t delete members</option>
                                <option value="admin">Admin - Can delete members</option>
                            </select>
                        </div>

                        <button type="button" onClick={handleDelete} style={styles.deleteButton}>Delete</button>
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
        deleteButton: {
            backgroundColor: "#ff4d4d",
            color: "white",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
            transition: "background-color 0.2s",
        },
        saveButton: {
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
            transition: "background-color 0.2s",
        },
        error: {
            color: "red",
            fontSize: "14px",
            marginTop: "5px",
            textAlign: "center",
        },
    };

export default EditMembers;
