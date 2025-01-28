import React, { useEffect, useState } from "react";
import ListMembers from './ListMembers'
import AddMembers from "./AddMembers";
import EditMembers from "./EditMembers";

const MainPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [userModifyId, setuserModifyId] = useState(null);

    const getCurrentPage = () => {
        if (currentPage === 1) {
            return (
                < ListMembers
                    setCurrentPage={setCurrentPage}
                    setuserModifyId={setuserModifyId}
                />
            );
        }
        if (currentPage === 2) {
            return (<AddMembers setCurrentPage={setCurrentPage} />);
        }
        if (currentPage === 3) {
            return (<EditMembers setCurrentPage={setCurrentPage} userModifyId={userModifyId} />);
        }

    }

    return getCurrentPage();
};

export default MainPage;