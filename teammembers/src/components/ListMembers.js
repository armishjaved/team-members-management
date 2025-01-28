import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/team-members/")
      .then((response) => setTeamMembers(response.data))
      .catch((error) => console.error("Error fetching team members:", error));
  }, []);

  return (
    <div style={styles.page}>
      {/* Sticky Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Team Members</h2>
        <button onClick={() => navigate("/add")} style={styles.addButton}>+</button>
      </div>

      {/* Scrollable List */}
      <div style={styles.listContainer}>
        {teamMembers.length === 0 ? (
          <p style={styles.emptyMessage}>You have 0 team members.</p>
        ) : (
          teamMembers.map((member) => (
            <div key={member.id} style={styles.memberCard}>
              <div style={styles.memberInfo} onClick={() => navigate(`/edit/${member.id}`)}>
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

const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      padding: "20px",
    },
    header: {
      position: "sticky",
      top: "0",
      backgroundColor: "white",
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      borderRadius: "12px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    addButton: {
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "20px",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    listContainer: {
      width: "100%",
      maxWidth: "500px",
      overflowY: "auto",
      maxHeight: "80vh",
      marginTop: "10px",
    },
    memberCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "10px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    emptyMessage: {
      textAlign: "center",
      fontSize: "16px",
      color: "#777",
    },
  };  

export default ListMembers;
