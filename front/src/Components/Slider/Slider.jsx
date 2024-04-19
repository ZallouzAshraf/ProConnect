import React from "react";
import "./Slider.css";
import img1 from "../../Assets/image1.jpg";
import img2 from "../../Assets/image2.jpg";
import img3 from "../../Assets/image3.png";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Slider() {
  const slideProperties = {
    duration: 2500,
    transitionDuration: 1000,
    infinite: true,
    indicators: false,
    arrows: true,
    pauseOnHover: true,
  };
  return (
    <div className="slide-container">
      <Slide {...slideProperties}>
        <div className="each-slide">
          <div
            className="slide-f"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${img1})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="desc-proconnect">
              <h1>PROconnect</h1>
              <p>
                Notre plateforme simplifie la gestion d'entreprise, de la
                clientèle à la facturation. Gérez tout en un seul endroit
              </p>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="slide-f"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${img2})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="desc-proconnect">
              <h1>PROconnect</h1>
              <p>
                Nos partenariats stratégiques vous offrent un accès privilégié à
                des solutions de pointe. Notre plateforme vous fournit les
                outils pour réussir dans un monde en constante évolution
              </p>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="slide-f"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img3})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="desc-proconnect">
              <h1>PROconnect</h1>
              <p>
                Profitez d'un soutien continu de notre équipe d'experts pour
                atteindre vos objectifs professionnels en tant que membre de
                notre communauté
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}
