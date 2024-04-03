import React from "react";
import "./Contactus.css";

export default function Contactus() {
  return (
    <div className="contact-container">
      <main className="contact-row">
        <section className="col left">
          <div className="contactTitle">
            <h2>Contactez-nous</h2>
            <p>Nous sommes là pour vous aider !</p>
          </div>

          <div className="contactInfo">
            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="details-contactus">
                <span>Phone</span>
                <span>+216 20 30 45 85</span>
              </div>
            </div>

            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="details-contactus">
                <span>Email</span>
                <span>Proconnect@gmail.com</span>
              </div>
            </div>
            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="details-contactus">
                <span>Localisation</span>
                <span>Sousse , Sahloul Rte ceinture 4054</span>
              </div>
            </div>
          </div>
          <div className="socialMedia">
            <a href="">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </section>

        <section className="col right">
          <form className="messageForm">
            <div className="inputGroup halfWidth">
              <input type="text" name="" required />
              <label>Nom</label>
            </div>

            <div className="inputGroup halfWidth">
              <input type="email" name="" required />
              <label>Email</label>
            </div>

            <div className="inputGroup fullWidth">
              <input type="text" name="" required />
              <label>Objet</label>
            </div>

            <div className="inputGroup fullWidth">
              <textarea required></textarea>
              <label>Ecrivez votre Message</label>
            </div>

            <div className="inputGroup fullWidth">
              <button>Envoyer le message</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
