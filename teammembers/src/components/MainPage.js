import React, { useState } from "react";
import ListMembers from "./ListMembers";
import AddMembers from "./AddMembers";
import EditMembers from "./EditMembers";

const MainPage = ({ userRole, setCurrentPage }) => {  
    const [currentPage, setLocalPage] = useState(1); 
    const [userModifyId, setuserModifyId] = useState(null);

    const getCurrentPage = () => {
        if (currentPage === 1) {
            return (
                <ListMembers
                    setCurrentPage={setLocalPage}
                    setuserModifyId={setuserModifyId}
                    goToLandingPage={() => setCurrentPage(0)}  
                />
            );
        }
        if (currentPage === 2) {
            return <AddMembers setCurrentPage={setLocalPage} />;
        }
        if (currentPage === 3) {
            return <EditMembers setCurrentPage={setLocalPage} userModifyId={userModifyId} userRole={userRole} />;
        }
    };

    return getCurrentPage();
};

export default MainPage;
