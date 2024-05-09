import React, { useEffect, useState } from "react";
import "./Addcat.css";
import Sidebaradmin from "../SidebarAdmin/Sidebaradmin";
import upload_icon from "../../../Assets/upload_img.svg";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

export default function Addcat() {
  const [cat, setcat] = useState({ nom: "", image: "" });
  const [image, setImage] = useState();
  const [categorie, setcategorie] = useState([]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changehandler = (e) => {
    setcat({ ...cat, [e.target.name]: e.target.value });
  };

  const addCat = async () => {
    let responseData = {};
    let categorie = { ...cat };
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
        categorie.image = responseData.image_url;
        const addDataCategorie = await fetch(
          "http://localhost:4000/addCategorie",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categorie),
          }
        );
        const AddingData = await addDataCategorie.json();

        if (AddingData.success) {
          alert("Catégorie Ajouté");
        } else {
          alert(AddingData.errors);
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

  const DeleteCategorie = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteCat/${id}`
      );
      if (response.status === 200) {
        fetchCategorie();
      }
    } catch (error) {
      console.error("Error deleting rendezvous:", error);
    }
  };

  return (
    <div className="addCat">
      <div>
        <Sidebaradmin />
      </div>
      <div className="list-profs categ">
        <div className="cat-form">
          <div className="addcat-form">
            <h1>Ajouter Catégorie</h1>
            <input
              placeholder="Catégorie Name"
              type="text"
              name="categorie"
              onChange={changehandler}
              className="inputcat"
            />
            <div className="file-upload-form">
              <label for="file" className="file-upload-label">
                <div className="file-upload-design">
                  <img
                    src={image ? URL.createObjectURL(image) : upload_icon}
                    className="uploaded_photo"
                    alt=""
                  />
                  <p>ou</p>
                  <span className="browse-button">Parcourir</span>
                  <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="file"
                    hidden
                  />
                </div>
              </label>
            </div>
            <button className="btnajtcat" onClick={addCat}>
              Ajouter
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="list-categorie">
            <h1>Liste Catégories</h1>
            {categorie.map((item, index) => {
              return (
                <div key={index}>
                  <div className="list-cat-main listprofs">
                    <img
                      src={item.image}
                      alt=""
                      className="list-profs-img imgcat"
                    />
                    <p>{item.nom}</p>
                    <MdDeleteForever
                      className="listprofs-remove"
                      color="red"
                      size={"30px"}
                      onClick={() => DeleteCategorie(item._id)}
                    />
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
