import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Updateprofil.css";
import Setting from "../Setting/Setting";
import { GiPositionMarker } from "react-icons/gi";

export default function Updateprofil() {
  const authToken = localStorage.getItem("auth-token");
  const [userData, setuserData] = useState({});
  const [Newdata, setNewdata] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    adresse: "",
    email: "",
    password: "",
    image: "",
  });

  const changeHandler = (e) => {
    setNewdata({ ...Newdata, [e.target.name]: e.target.value });
  };
  const updateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/updateUser",
        Newdata,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );
      const responseData = response.data;
      if (response.status === 200) {
        alert("Utilisateur mis à jour avec succès");
        setuserData(responseData.updatedUser);
      } else {
        alert("Erreur lors de la mise à jour de l'utilisateur");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Échec de la mise à jour de l'utilisateur. Veuillez réessayer.");
    }
  };
  const getUserinfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setuserData(userData);
        setNewdata(userData);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUserinfo();
  }, []);

  return (
    <div className="profil-content">
      <div>
        <Setting />
      </div>
      <div className="update-profil">
        <div className="update-photo-container">
          <img src={userData.image} alt="" />
          <div className="details-profil">
            <div className="profil-info">
              <p>{userData.nom} </p>
              <p>{userData.prenom}</p>
            </div>
            <div className="profil-adr">
              <GiPositionMarker />
              <p>{userData.adresse}</p>
            </div>
          </div>
        </div>
        <div className="upd-container">
          <div className="title">Informations</div>
          <div className="form">
            <div className="det-form">
              <div className="leftform">
                <div className="inputfield">
                  <label>Nom</label>
                  <input
                    onChange={changeHandler}
                    value={Newdata.nom}
                    name="nom"
                    type="text"
                    className="input"
                  />
                </div>
                <div className="inputfield">
                  <label>Prénom</label>
                  <input
                    onChange={changeHandler}
                    value={Newdata.prenom}
                    name="prenom"
                    type="text"
                    className="input"
                  />
                </div>
                <div className="inputfield">
                  <label>Sexe</label>
                  <div className="custom_select">
                    <select
                      name="sexe"
                      value={Newdata.sexe}
                      onChange={changeHandler}
                    >
                      <option value="">Select</option>
                      <option value="male">Homme</option>
                      <option value="Female">Femme</option>
                    </select>
                  </div>
                </div>
                <div className="inputfield">
                  <label>Numéro de Téléphone</label>
                  <input
                    name="telephone"
                    type="text"
                    className="input"
                    value={Newdata.telephone}
                    onChange={changeHandler}
                  />
                </div>
                <div className="inputfield">
                  <label>Adresse</label>
                  <textarea
                    name="adresse"
                    className="textarea"
                    onChange={changeHandler}
                    value={Newdata.adresse}
                  ></textarea>
                </div>
              </div>
              <div className="rightform">
                <div className="inputfield">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    disabled
                    className="input"
                    onChange={changeHandler}
                    value={Newdata.email}
                  />
                </div>
                <div className="inputfield">
                  <div className="inputfield">
                    <label>Mot de Passe</label>
                    <input
                      name="password"
                      type="password"
                      className="input"
                      onChange={changeHandler}
                      value={Newdata.password}
                    />
                  </div>
                </div>
                <div className="inputbtn">
                  <input type="submit" value="Modifier" onClick={updateUser} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
