import React from "react";
import "./Admin.css";
import { Route, Routes } from "react-router-dom";
import ListProfs from "./ListProfs/ListProfs";
import ListClients from "./ListClients/ListClients";
import Sidebaradmin from "./SidebarAdmin/Sidebaradmin";

export default function Admin() {
  return (
    <div className="admin">
      <Sidebaradmin />
      <Routes>
        <Route path="/ListProfs" element={<ListProfs />} />
        <Route path="/ListClients" element={<ListClients />} />
      </Routes>
    </div>
  );
}
