import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo.png";
import facebook from "../../Assets/facebook.png";
import twitter from "../../Assets/twitter.png";
import whatsapp from "../../Assets/whatsapp.png";
import pinterest from "../../Assets/pinterest.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="row">
        <div className="col">
          <img src={logo} alt="logo" className="logo" />
          <p className="desc-footer">
            ProConnect est une plateforme qui vous aide à vous connecter avec
            des professionnels de votre secteur, à trouver des opportunités de
            carrière et à développer votre réseau sans effort. Rejoignez-nous
            dès aujourd'hui pour élargir vos horizons professionnels.
          </p>
        </div>
        <div className="col">
          <h3>
            Office
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p>Sousse , Sahloul Rte ceinture 4054 </p>
          <p>Zarzis , La place des Martyrs 4124 </p>
          <p className="email-id"> Proconnect@gmail.com</p>
          <h4>+216 20 30 45 85</h4>
        </div>
        <div className="col">
          <h3>
            Links
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link>Services</Link>
            </li>
            <li>
              <Link to="/About">A Propos</Link>
            </li>
            <li>
              <Link to="/Contact">Contacts</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            Newsletter
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <form>
            <i className="fa-regular fa-envelope"></i>
            <input type="email" placeholder="Entrer Votre Email" required />
            <button type="submit">
              <FaArrowRight color="white" />
            </button>
          </form>
          <div className="socials-icons">
            <img src={facebook} alt="" />
            <img src={whatsapp} alt="" />
            <img src={twitter} alt="" />
            <img src={pinterest} alt="" />
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">
        Copyright ©2024 ProConnect.com - All rights reserved.
      </p>
    </footer>
  );
}
