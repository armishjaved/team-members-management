import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";


const ListMembers = ({ setCurrentPage, setuserModifyId }) => {
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
        <div className="headerContent">
          <h2 className="title">Team Members</h2>
          {/* I assumed that an admin will always be in the list hence number of team members is total people -1 */}
          <p className="memberCount">You have {teamMembers.length - 1} Team Member(s)</p>
        </div>
        <button onClick={() => { setCurrentPage(2); }} className="addButton">+</button>
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
