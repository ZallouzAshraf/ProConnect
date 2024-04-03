import React from "react";
import "./Info.css";
import img1 from "../../Assets/disponibilite.png";
import img2 from "../../Assets/ql.png";
import img3 from "../../Assets/paiementsecurise.png";

export default function Info() {
  return (
    <div>
      <h1 className="text-shadow">
        Pourquoi prendre rendez-vous avec ProConnect ?{" "}
      </h1>

      <div className="infos">
        <div>
          <img src={img1} alt="" />
          <p>ProConnect facilite la recherche de professionnels qualifiés.</p>
        </div>
        <div>
          <img src={img2} alt="" />
          <p>
            Évitez les recherches fastidieuses pour trouver un professionnel
            disponible.
          </p>
        </div>
        <div>
          <img src={img3} alt="" />
          <p>
            Simplifiez vos paiements en ligne et signalez les problèmes
            facilement.
          </p>
        </div>
      </div>
    </div>
  );
}
