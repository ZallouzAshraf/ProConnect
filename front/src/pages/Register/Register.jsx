import React, { useState } from "react";
import "./Register.css";
import upload_icon from "../../Assets/upload_img.svg";

export default function Register() {
  const [image, setImage] = useState();
  const [UserData, setUserData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    adresse: "",
    email: "",
    password: "",
    image: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const registerUser = async () => {
    let responseData = {};
    let user = { ...UserData };
    let formData = new FormData();
    formData.append("image", image);

    try {
      // Upload image
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      responseData = uploadData;

      if (responseData.success) {
        user.image = responseData.image_url;

        // Register user
        const registerResponse = await fetch("http://localhost:4000/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
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
              <div className="inputfield">
                <label htmlFor="file-input">
                  <img
                    src={image ? URL.createObjectURL(image) : upload_icon}
                    alt=""
                    className="uploaded_photo"
                  />
                </label>
                <input
                  onChange={imageHandler}
                  type="file"
                  name="image"
                  id="file-input"
                  hidden
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
                  onClick={() => {
                    registerUser();
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
