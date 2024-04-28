import React from "react";
import Updateprofil from "../../Components/Updateprofil/Updateprofil";
import Messages from "../../Components/Messages/Messages";
import Rendezvous from "../../Components/Rendezvous/Rendezvous";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Setting() {
  return (
    <div>
      <div className="profil">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/Setting/*" element={<Updateprofil />} />
            <Route path="/Setting/*" element={<Messages />} />
            <Route path="/Setting/*" element={<Rendezvous />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
