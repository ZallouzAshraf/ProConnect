import React, { useEffect, useState } from "react";
import "./Registerpro.css";
import { villedata } from "../../Components/Data/data";
import axios from "axios";

export default function Registerpro() {
  const [image, setimage] = useState();
  const [imagediplome, setImagediplome] = useState();
  const [imagecin, setImagecin] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [categorie, setcategorie] = useState([]);
  const [UserData, setUserData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    adresse: "",
    email: "",
    password: "",
    image: "",
    imagediplome: "",
    imagecin: "",
    profession: "",
    ville: "",
  });
  const imageHandler = (e) => {
    const name = e.target.name;

    switch (name) {
      case "image":
        setimage(e.target.files[0]);
        break;
      case "imagediplome":
        setImagediplome(e.target.files[0]);
        break;
      case "imagecin":
        setImagecin(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const changeHandler = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const registerProf = async () => {
    let responseData = {};
    let prof = { ...UserData };
    let formData = new FormData();
    formData.append("images", image);
    formData.append("images", imagediplome);
    formData.append("images", imagecin);

    try {
      // Upload image
      const uploadResponse = await fetch("http://localhost:4000/uploadprof", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      responseData = uploadData;

      if (responseData.success) {
        prof.image = responseData.image_urls[0];
        prof.imagediplome = responseData.image_urls[1];
        prof.imagecin = responseData.image_urls[2];

        // Register prof
        const registerResponse = await fetch(
          "http://localhost:4000/registerprof",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(prof),
          }
        );
        const registerData = await registerResponse.json();

        if (registerData.success) {
          localStorage.setItem("auth-token", registerData.token);
          localStorage.setItem("user-type", registerData.type);
          window.location.replace("/");
        } else {
          alert(registerData.errors);
        }
      } else {
        alert("Échec du téléchargement de l'image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur s'est produite. Veuillez réessayer");
    }
  };

  const fetchCategorie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/allcategories`);
      setcategorie(response.data.data);
    } catch (error) {
      console.log("Erreur");
    }
  };

  useEffect(() => {
    fetchCategorie();
  }, [categorie]);
  return (
    <div className="reg-container">
      <div className="wrapper">
        <div className="title">Register Professionnel</div>
        <div className="form">
          <div className="det-form">
            <div className="leftform">
              <div className="inputfield">
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="input"
                  value={UserData.nom}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  className="input"
                  value={UserData.prenom}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Sexe</label>
                <div className="custom_select">
                  <select
                    name="sexe"
                    value={UserData.sexe}
                    onChange={changeHandler}
                    required
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
                  type="text"
                  name="telephone"
                  className="input"
                  value={UserData.telephone}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Télécharger une photo de profil</label>
                <input
                  type="file"
                  className="input"
                  name="image"
                  onChange={imageHandler}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Télécharger votre Diplome</label>
                <input
                  type="file"
                  className="input"
                  name="imagediplome"
                  onChange={imageHandler}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Télécharger votre CIN</label>
                <input
                  type="file"
                  name="imagecin"
                  className="input"
                  onChange={imageHandler}
                  required
                />
              </div>
            </div>
            <div className="rightform">
              <div className="inputfield">
                <label>Email </label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={UserData.email}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Mot de passe </label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  value={UserData.password}
                  onChange={changeHandler}
                  required
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
              <div className="inputfield">
                <label>Profession</label>
                <div className="custom_select">
                  <select
                    name="profession"
                    value={UserData.profession}
                    onChange={changeHandler}
                    required
                  >
                    {categorie.map((item, index) => (
                      <option key={index} value={item.nom}>
                        {item.nom}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="inputfield">
                <label>Ville</label>
                <div className="custom_select">
                  <select
                    name="ville"
                    value={UserData.ville}
                    onChange={changeHandler}
                    required
                  >
                    {villedata.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="inputfield terms">
                <label className="check">
                  <input type="checkbox" onChange={handleCheckboxChange} />
                  <span className="checkmark"></span>
                </label>
                <p>Accepter les termes et conditions</p>
              </div>
              <div className="inputfield">
                <input
                  type="submit"
                  value="Register"
                  onClick={() => {
                    registerProf();
                  }}
                  disabled={!isChecked}
                  className={!isChecked ? "disabled" : "btn"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
