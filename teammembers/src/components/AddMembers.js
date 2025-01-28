import React, { useState } from "react";
import axios from "axios";
import "../styles.css";


const AddMembers = (props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    role: "regular",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/team-members/", formData)
      .then(() => { props.setCurrentPage(1); })
      .catch((error) => {
        if (error.response && error.response.data.email) {
          setError(error.response.data.email[0]); //email error
        } else {
          console.error("Error adding team member:", error);
        }
      });
  };
  return (
    <div className="page">
      <div className="container">
        <div >
          <button onClick={() => props.setCurrentPage(1)} className="backButton">←</button>
          <h2 className="title">Add Team Members</h2>
        </div>
        <p className="subtitle">Set email, location, and role.</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label>First Name</label>
            <input
              name="first_name"
              placeholder="Enter first name"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="formGroup">
            <label>Last Name</label>
            <input
              name="last_name"
              placeholder="Enter last name"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="formGroup">
            <label>Phone Number</label>
            <input
              name="phone_number"
              placeholder="Enter phone number"
              onChange={handleChange}
              required
              className="input"
            />

          </div>

          <div className="formGroup">
            <label>Email</label>
            <input
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
              className="input"
            />
          </div>



          <div className="formGroup">
            <label>Role</label>
            <select name="role" onChange={handleChange} className="select">
              <option value="regular">Regular - Can’t delete members</option>
              <option value="admin">Admin - Can delete members</option>
            </select>
          </div>

          <button type="submit" className="saveButton">Save</button>
          {error && <p className="error">{error}</p>} {/* Show error if exists */}
        </form>
      </div>
    </div>
  );
};

export default AddMembers;