import React from "react";
import "./Registertype.css";
import client from "../../Assets/client.png";
import pro from "../../Assets/pro.png";
import { Link } from "react-router-dom";

export default function Registertype() {
  return (
    <div className="reg-container">
      <h1>Vous-êtes .... ?</h1>
      <div className="reg-choix">
        <div className="left-reg">
          <img src={client} alt="" />
          <p>Vous êtes Client ?</p>
          <Link to="/Register/Client">
            <button className="btnchoix">Choisir</button>
          </Link>
        </div>
        <div className="right-reg">
          <img src={pro} alt="" />
          <p>Vous êtes Professionnel ?</p>
          <Link to="/Register/Professionnel">
            <button className="btnchoix">Choisir</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
