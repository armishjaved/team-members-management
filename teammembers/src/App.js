import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListMembers from "./components/ListMembers";
import AddMembers from "./components/AddMembers";
import EditMembers from "./components/EditMembers";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ListMembers />} />
      <Route path="/add" element={<AddMembers />} />
      <Route path="/edit/:id" element={<EditMembers />} />
    </Routes>
  </Router>
);

export default App;