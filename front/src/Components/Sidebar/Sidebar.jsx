import React from "react";
import { Link } from "react-router-dom";
import rdv from "../../Assets/rdv.png";
import update from "../../Assets/update.png";
import message from "../../Assets/email.png";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/UpdateProfil">
        <div className="sidebar-item">
          <img src={update} alt="" />
          <p>Modifier Profil</p>
        </div>
      </Link>
      <Link to="/Messages">
        <div className="sidebar-item">
          <img src={message} alt="" />
          <p>Messages</p>
        </div>
      </Link>
      <Link to="/ListRendezVous">
        <div className="sidebar-item">
          <img src={rdv} alt="" />
          <p>Liste Rendez-vous</p>
        </div>
      </Link>
    </div>
  );
}
