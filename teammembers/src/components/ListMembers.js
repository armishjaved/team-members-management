import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";


const ListMembers = ({ setCurrentPage, setuserModifyId, goToLandingPage }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/team-members/")
      .then((response) => setTeamMembers(response.data))
      .catch((error) => console.error("Error fetching team members:", error));
  }, []);

  return (
    <div className="page">
  {/* Sticky Header */}
  <div className="header">
  <div className="header-content">
  <button onClick={goToLandingPage} className="backButton">←</button>  
    <h2 className="title">Team Members</h2>
    <button onClick={() => { setCurrentPage(2); }} className="addButton">+</button>
  </div>
  {teamMembers.length > 0 && (
    <div className="memberCount">
      {/* assuming admin is always there before regular members */}
      You have {teamMembers.length -1} Team Member{teamMembers.length !== 1 ? "s" : ""}
    </div>
  )}
</div>


  {/* Scrollable List */}
  <div className="listContainer">
    {teamMembers.length === 0 ? (
      <p className="emptyMessage">You have 0 team members.</p>
    ) : (
      teamMembers.map((member) => (
        <div key={member.id} className="memberCard">
          <div className="memberInfo" onClick={() => { setCurrentPage(3); setuserModifyId(member.id); }}>
            <h4>{member.first_name} {member.last_name} {member.role === "admin" ? "(Admin)" : ""}</h4>
            <p>{member.phone_number}</p>
            <p>{member.email}</p>
          </div>
        </div>
      ))
    )}
  </div>
</div>


  );
};

export default ListMembers;
