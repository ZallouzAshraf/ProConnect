import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo.png";

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
            Office{" "}
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
            Links{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>
            <li>
              <a href="">A Propos</a>
            </li>
            <li>
              <a href="">Contacts</a>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            Newsletter{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <form action="">
            <i class="fa-regular fa-envelope"></i>
            <input type="email" placeholder="Entrer Votre Email" required />
            <button type="submit">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          <div className="socials-icons">
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-whatsapp"></i>
            <i class="fa-brands fa-pinterest"></i>
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
