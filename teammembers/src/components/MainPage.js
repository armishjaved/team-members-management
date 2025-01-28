import React, { useState } from "react";
import ListMembers from "./ListMembers";
import AddMembers from "./AddMembers";
import EditMembers from "./EditMembers";

const MainPage = ({ userRole }) => {  // Accept userRole as a prop
    const [currentPage, setCurrentPage] = useState(1); // Start at team list
    const [userModifyId, setuserModifyId] = useState(null);

    const getCurrentPage = () => {
        if (currentPage === 1) {
            return (
                <ListMembers
                    setCurrentPage={setCurrentPage}
                    setuserModifyId={setuserModifyId}
                />
            );
        }
        if (currentPage === 2) {
            return <AddMembers setCurrentPage={setCurrentPage} />;
        }
        if (currentPage === 3) {
            return <EditMembers setCurrentPage={setCurrentPage} userModifyId={userModifyId} userRole={userRole} />;
        }
    };

    return getCurrentPage();
};

export default MainPage;
