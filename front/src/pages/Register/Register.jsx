import React, { useState } from "react";
import "./Register.css";

export default function Register() {
  const [UserData, setUserData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    adresse: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
    console.log(UserData);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const register = async () => {
    let responseData;
    await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  return (
    <div className="reg-container">
      <div className="wrapper">
        <div className="title">Register Client</div>
        <div className="form">
          <div className="det-form">
            <div className="leftform">
              <div className="inputfield">
                <label>Nom</label>
                <input
                  value={UserData.nom}
                  onChange={changeHandler}
                  name="nom"
                  type="text"
                  className="input"
                />
              </div>
              <div className="inputfield">
                <label>Prénom</label>
                <input
                  name="prenom"
                  type="text"
                  className="input"
                  value={UserData.prenom}
                  onChange={changeHandler}
                />
              </div>
              <div className="inputfield">
                <label>Sexe</label>
                <div className="custom_select">
                  <select
                    name="sexe"
                    value={UserData.sexe}
                    onChange={changeHandler}
                  >
                    <option value="">Select</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                  </select>
                </div>
              </div>
              <div className="inputfield">
                <label>Numéro de Téléphone</label>
                <input
                  name="telephone"
                  type="text"
                  className="input"
                  value={UserData.telephone}
                  onChange={changeHandler}
                />
              </div>
              <div className="inputfield">
                <label>Adresse</label>
                <textarea
                  name="adresse"
                  className="textarea"
                  value={UserData.adresse}
                  onChange={changeHandler}
                ></textarea>
              </div>
            </div>
            <div className="rightform">
              <div className="inputfield">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  className="input"
                  value={UserData.email}
                  onChange={changeHandler}
                />
              </div>
              <div className="inputfield">
                <label>Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  value={UserData.password}
                  onChange={changeHandler}
                />
              </div>

              <div className="inputfield terms">
                <label className="check">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>Accepter les termes et conditions</p>
              </div>
              <div className="inputfield">
                <input
                  type="submit"
                  value="Register"
                  className={`btn ${!isChecked ? "disabled" : ""}`}
                  onClick={() => register()}
                  disabled={!isChecked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
