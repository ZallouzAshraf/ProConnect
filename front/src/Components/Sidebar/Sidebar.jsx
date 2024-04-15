import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rdv from "../../Assets/rdv.png";
import update from "../../Assets/update.png";
import message from "../../Assets/email.png";
import "./Sidebar.css";

export default function Sidebar() {
  const authToken = localStorage.getItem("auth-token");
  const [userData, setuserData] = useState({});

  const getUserinfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setuserData(userData);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUserinfo();
  }, []);
  return (
    <div className="sidebar">
      {userData.verified == "false" ? (
        <Link to="/UpdateProfil">
          <div className="sidebar-item">
            <img src={update} alt="" />
            <p>Modifier Profil</p>
          </div>
        </Link>
      ) : (
        <div>
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
      )}
    </div>
  );
}
