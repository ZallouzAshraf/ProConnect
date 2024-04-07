import React from "react";
import "./About.css";
import imgabout from "../../Assets/aboutimg.jpg";

export default function About() {
  return (
    <div className="about-all">
      <div className="heading">
        <h1>A Propos</h1>
        <p>
          Construisez votre réseau professionnel et atteignez de nouveaux
          sommets
        </p>
      </div>
      <div className="container">
        <section className="about">
          <div className="about-image">
            <img src={imgabout} alt="" />
          </div>
          <div className="about-content">
            <h2> Un Réseau Professionnel Dynamique</h2>
            <p>
              ProConnect offre une plateforme robuste et conviviale qui facilite
              la connexion entre les professionnels du monde entier. Grâce à ses
              fonctionnalités avancées, les utilisateurs peuvent établir des
              contacts professionnels, partager des connaissances, et collaborer
              sur des projets, le tout dans un environnement sécurisé. Que vous
              soyez à la recherche de partenaires commerciaux, de mentors ou
              simplement d'une communauté professionnelle dynamique, ProConnect
              vous offre les outils nécessaires pour développer votre réseau et
              atteindre vos objectifs professionnels. Avec des fonctionnalités
              telles que les forums de discussion, les groupes thématiques et
              les options de recherche avancée, ProConnect met l'accent sur
              l'engagement et l'interaction entre ses utilisateurs, favorisant
              ainsi une expérience enrichissante et collaborative.
            </p>
            <button>Read More</button>
          </div>
        </section>
      </div>
    </div>
  );
}
