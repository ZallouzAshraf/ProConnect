import React from "react";
import "./Detailsprof.css";
import { useLocation } from "react-router-dom";
import homme from "../../Assets/homme.png";
import { GiPositionMarker } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import femme from "../../Assets/femme.png";
import chat from "../../Assets/chat.png";
import call from "../../Assets/appeler.png";
import clock from "../../Assets/clock.png";
import Calendrier from "../Calendrier/Calendrier";

export default function Detailsprof() {
  const { state } = useLocation();
  const { nom, ville, spec, genre } = state || {};

  return (
    <div>
      <div className="details-professionnel">
        <div className="image-prof">
          <img src={genre === "Homme" ? homme : femme} alt="" />
        </div>
        <div className="info-professionnel">
          <h4>{nom}</h4>
          <h3>{spec}</h3>
          <p>
            <GiPositionMarker />
            {ville}
          </p>
        </div>
        <div className="rdv">
          <button>
            <FaCalendarAlt /> Prendre Rendez-vous
          </button>
        </div>
      </div>
      <div className="info-contact">
        <div className="contact-numbers">
          <h1>Informations Contact :</h1>
          <div className="professionnel-btn">
            <img src={chat} alt="" />
            <button className="btn-msg">Envoyer un message </button>
          </div>
          <div className="professionnel-btn">
            <img src={call} alt="" />
            <button className="btn-num">Afficher le numéro</button>
          </div>

          <div className="horaire-prof">
            <h2>Horaires d'ouverture</h2>
            <ul>
              <li>
                <span className="jour">Lundi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Mardi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Mercredi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Jeudi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Vendredi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Samedi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 14:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="contact-rdv">
          <Calendrier />
          <div className="pick-time">
            <input type="radio" id="time1" name="time" value="8:00" />
            <label htmlFor="time1">8:00</label>
            <input type="radio" id="time-830" name="time" value="8:30" />
            <label htmlFor="time-830">8:30</label>
            <input type="radio" id="time3" name="time" value="9:00" />
            <label htmlFor="time3">9:00</label>
            <input type="radio" id="time4" name="time" value="9:30" />
            <label htmlFor="time4">9:30</label>
            <input type="radio" id="time5" name="time" value="10:00" />
            <label htmlFor="time5">10:00</label>
            <input type="radio" id="time6" name="time" value="10:30" />
            <label htmlFor="time6">10:30</label>
            <input type="radio" id="time7" name="time" value="11:00" />
            <label htmlFor="time7">11:00</label>
            <input type="radio" id="time8" name="time" value="11:30" />
            <label htmlFor="time8">11:30</label>
            <input type="radio" id="time9" name="time" value="14:00" />
            <label htmlFor="time9">14:00</label>
            <input type="radio" id="time10" name="time" value="14:30" />
            <label htmlFor="time10">14:30</label>
            <input type="radio" id="time11" name="time" value="15:00" />
            <label htmlFor="time11">15:00</label>
            <input type="radio" id="time12" name="time" value="15:30" />
            <label htmlFor="time12">15:30</label>
            <input type="radio" id="time13" name="time" value="16:00" />
            <label htmlFor="time13">16:00</label>
            <input type="radio" id="time14" name="time" value="16:30" />
            <label htmlFor="time14">16:30</label>
          </div>
        </div>
      </div>
    </div>
  );
}
