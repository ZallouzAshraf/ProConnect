import React from "react";
import "./Procard.css";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function Procard(props) {
  const authToken = localStorage.getItem("auth-token");
  const nav = useNavigate();
  const { nom, prenom, ville, spec, genre, phone } = props;

  const rediriger = () => {
    if (authToken) {
      nav("/Details", {
        state: { nom, prenom, ville, spec, genre, phone },
      });
    } else {
      alert("Vous devez Connectez !");
      nav("/login");
    }
  };
  return (
    <div>
      <div className="procard">
        <div className="info">
          <img src={props.img} alt="profil" />
          <div className="details">
            <div className="det-inf">
              <h4>{props.nom}</h4>
              <h4>{props.prenom}</h4>
            </div>

            <h3>{props.spec}</h3>
            <p>
              <GiPositionMarker />
              {props.ville}
            </p>
          </div>
          <div>
            <button onClick={rediriger}>
              <FaCalendarAlt /> Prendre Rendez-vous
            </button>
          </div>
        </div>
        <hr />
        <div className="description">
          <h2>description : </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            pariatur facilis, quisquam atque perspiciatis et nemo! Velit,
            tenetur iusto quis inventore, eos laboriosam minus quia omnis
            necessitatibus illo, vitae numquam.
          </p>
        </div>
      </div>
    </div>
  );
}
