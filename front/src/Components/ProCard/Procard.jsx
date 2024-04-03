import React from "react";
import "./Procard.css";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function Procard(props) {
  const nav = useNavigate();
  const { nom, ville, spec, genre } = props;

  const rediriger = () => {
    nav("/Details", { state: { nom, ville, spec, genre } });
  };
  return (
    <div>
      <div className="procard">
        <div className="info">
          <img src={props.img} alt="profil" />
          <div className="details">
            <h4 onClick={rediriger}>{props.nom}</h4>
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
