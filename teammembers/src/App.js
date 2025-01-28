import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0); // 0 = LandingPage, 1 = MainPage
  const [userRole, setUserRole] = useState("");

  return (
    <div>
      {currentPage === 0 ? (
        <LandingPage setCurrentPage={setCurrentPage} setUserRole={setUserRole} />
      ) : (
        <MainPage userRole={userRole} setCurrentPage={setCurrentPage} />  // Pass setCurrentPage
      )}
    </div>
  );
};

export default App;
