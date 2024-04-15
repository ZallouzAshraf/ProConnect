import React from "react";
import "./Verifpage.css";

export default function Verifpage() {
  return (
    <div className="verifpage">
      <p>
        Merci de patienter pendant que nous vérifions votre compte. <br />
        La vérification peut prendre entre 1 à 2 jours. <br />
        Nous vous tiendrons informé(e) dès que cela sera fait. <br /> Merci pour
        votre compréhension.
      </p>
      <div class="terminal-loader">
        <div class="terminal-header">
          <div class="terminal-title">Status</div>
          <div class="terminal-controls">
            <div class="control close"></div>
            <div class="control minimize"></div>
            <div class="control maximize"></div>
          </div>
        </div>
        <div class="text">Vérification ....</div>
      </div>
    </div>
  );
}
