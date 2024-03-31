import React from "react";
import "./Procard.css";
import profil from "../../Assets/homme.png";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";

export default function Procard(props) {
  return (
    <div>
      <div className="procard">
        <div className="info">
          <img src={profil} alt="profil" />
          <div className="details">
            <h4>{props.nom}</h4>
            <h3>{props.spec}</h3>
            <p>
              <GiPositionMarker />
              {props.ville}
            </p>
          </div>
          <div>
            <button>
              <FaCalendarAlt /> Prendre Rendez-vous
            </button>
          </div>
        </div>
        <hr />
        <div className="description">
          <h2>description : </h2>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
