import React  from "react";
import "./Slider.css";
import img1 from "../../Assets/image1.jpg";
import img2 from "../../Assets/image2.jpg";
import img3 from "../../Assets/image3.png";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Slider() {
  const slideProperties = {
    duration: 2500,
    transitionDuration: 1500,
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
              <h1>ProConnect</h1>
              <p>
                Notre plateforme vous offre une multitude de fonctionnalités
                pour simplifier la gestion de votre entreprise, de la gestion
                des clients à la facturation en passant par la gestion des
                projets. Avec des outils puissants et intuitifs à votre
                disposition, vous pouvez gérer tous les aspects de votre
                activité en un seul endroit, et ainsi gagner du temps et rester
                organisé
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
              <h1>ProConnect</h1>
              <p>
                Grâce à nos partenariats stratégiques avec les leaders de
                l'industrie, nous vous offrons un accès privilégié à des
                ressources exclusives et à des solutions de pointe. Que vous
                cherchiez à optimiser vos processus, à développer votre
                entreprise ou à rester à jour avec les dernières tendances,
                notre plateforme vous fournit les outils et les informations
                nécessaires pour réussir dans un monde en constante évolution.
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
              <h1>ProConnect</h1>
              <p>
                En tant que membre de notre communauté, vous bénéficiez d'un
                soutien continu et d'une assistance personnalisée de la part de
                notre équipe d'experts. Que vous ayez des questions, des
                préoccupations ou des idées, nous sommes là pour vous aider à
                chaque étape de votre parcours. Rejoignez-nous dès aujourd'hui
                et découvrez comment nous pouvons vous aider à atteindre vos
                objectifs professionnels.
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}
