import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const EditMembers = ({ setCurrentPage, userModifyId, userRole }) => {
    const id = userModifyId;
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
        setError("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/team-members/${id}/`, formData)
            .then(() => { setCurrentPage(1); })
            .catch((error) => {
                if (error.response && error.response.data.email) {
                    setError(error.response.data.email[0]); //email error
                } else {
                    console.error("Error updating team member:", error);
                }
            });
    };

    const handleDelete = () => {
        if (userRole !== "admin") {
            setError("Only admins can delete team members.");
            return;
        }
        axios.delete(`http://127.0.0.1:8000/api/team-members/${id}/`)
            .then(() => { setCurrentPage(1); })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    setError("Only admins can delete team members.");
                } else if (error.response && error.response.status === 401) {
                    setError("You must be logged in to delete.");
                } else {
                    console.error("Error deleting team member:", error);
                }
            });
    };
    return (
        <div className="page">
            <div className="container">
                <div >
                    <button onClick={() => setCurrentPage(1)} className="backButton">←</button>
                    <h2 className="title">Edit Team Member</h2>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="formGroup">
                        <label>First Name</label>
                        <input name="first_name" value={formData.first_name} onChange={handleChange} required className="input" />
                    </div>

                    <div className="formGroup">
                        <label>Last Name</label>
                        <input name="last_name" value={formData.last_name} onChange={handleChange} required className="input" />
                    </div>

                    <div className="formGroup">
                        <label>Phone Number</label>
                        <input name="phone_number" value={formData.phone_number} onChange={handleChange} required className="input" />
                    </div>

                    <div className="formGroup">
                        <label>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} required className="input" />
                    </div>


                    <div className="formGroup">
                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="select">
                            <option value="regular">Regular - Can’t delete members</option>
                            <option value="admin">Admin - Can delete members</option>
                        </select>
                    </div>

                    <button type="button" onClick={handleDelete}className="deleteButton">Delete</button>
                    <button type="submit" className="saveButton">Save</button>
                    {error && <p className="error">{error}</p>} {/* Show error if exists */}
                </form>
            </div>
        </div>
    );
};

export default EditMembers;
