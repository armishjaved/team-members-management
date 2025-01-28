import React, { useState } from "react";
import "../styles.css"; 

const LandingPage = ({ setCurrentPage, setUserRole }) => {
  const [role, setRole] = useState("");

  const handleRoleSelect = (e) => {
    setRole(e.target.value);
  };

  const handleProceed = () => {
    if (role) {
      setUserRole(role);
      setCurrentPage(1); // Navigate to the next page (Team Members)
    } else {
      alert("Please select a role before proceeding!");
    }
  };

  return (
    <div className="main-page">
      <div className="dropdown-container">
        <h2 className="title">Select Your Role</h2>
        <select className="dropdown" value={role} onChange={handleRoleSelect}>
          <option value="">-- Choose Role --</option>
          <option value="admin">Admin</option>
          <option value="regular">Regular</option>
        </select>
        <button className="proceed-button" onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
