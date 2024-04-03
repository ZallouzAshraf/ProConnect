import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo.png";
import facebook from "../../Assets/facebook.png";
import twitter from "../../Assets/twitter.png";
import whatsapp from "../../Assets/whatsapp.png";
import pinterest from "../../Assets/pinterest.png";
import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="row">
        <div className="col">
          <img src={logo} alt="logo" className="logo" />
          <p>
            ProConnect is a platform that helps you connect with professionals
            in your industry, find career opportunities, and grow your network
            effortlessly. Join us to expand your professional horizons today.
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
            <li>Home</li>
            <li>Services</li>
            <li>A Propos</li>
            <li>Contacts</li>
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
