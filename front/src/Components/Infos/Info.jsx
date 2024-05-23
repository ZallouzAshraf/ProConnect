import React from "react";
import "./Info.css";
import img1 from "../../Assets/disponibilite.webp";
import img2 from "../../Assets/ql.webp";
import img3 from "../../Assets/paiementsecurise.webp";

export default function Info() {
  return (
    <div>
      <h1 className="text-shadow">
        Pourquoi prendre rendez-vous avec ProConnect ?{" "}
      </h1>

      <div className="infos">
        <div>
          <img src={img1} alt="" width={"100%"} height={"90%"} />
          <p>ProConnect facilite la recherche de professionnels qualifiés.</p>
        </div>
        <div>
          <img src={img2} alt="" width={"100%"} height={"90%"} />
          <p>
            Évitez les recherches fastidieuses pour trouver un professionnel
            disponible.
          </p>
        </div>
        <div>
          <img src={img3} alt="" width={"100%"} height={"90%"} />
          <p>
            Simplifiez vos paiements en ligne et signalez les problèmes
            facilement.
          </p>
        </div>
      </div>
    </div>
  );
}
