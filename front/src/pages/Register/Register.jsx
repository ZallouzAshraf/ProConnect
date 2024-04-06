import React from "react";
import "./Register.css";

export default function Register() {
  return (
    <div className="reg-container">
      <div className="wrapper">
        <div className="title">Register Client</div>
        <div className="form">
          <div className="det-form">
            <div className="leftform">
              <div className="inputfield">
                <label>Nom</label>
                <input type="text" className="input" />
              </div>
              <div className="inputfield">
                <label>Prénom</label>
                <input type="text" className="input" />
              </div>
              <div className="inputfield">
                <label>Sexe</label>
                <div className="custom_select">
                  <select>
                    <option value="">Select</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                  </select>
                </div>
              </div>
              <div className="inputfield">
                <label>Numéro de Téléphone</label>
                <input type="text" className="input" />
              </div>
              <div className="inputfield">
                <label>Adresse</label>
                <textarea className="textarea"></textarea>
              </div>
            </div>
            <div className="rightform">
              <div className="inputfield">
                <label>Email </label>
                <input type="text" className="input" />
              </div>
              <div className="inputfield">
                <label>Mot de passe </label>
                <input type="password" className="input" />
              </div>
              <div className="inputfield">
                <label>Confirme Mot de passe</label>
                <input type="password" className="input" />
              </div>

              <div className="inputfield">
                <label>Code Postal</label>
                <input type="text" className="input" />
              </div>
              <div className="inputfield terms">
                <label className="check">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <p>Accepter les termes et conditions</p>
              </div>
              <div className="inputfield">
                <input type="submit" value="Register" className="btn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
