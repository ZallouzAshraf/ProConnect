import React, { useEffect } from "react";
import "./Allcategories.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Allcategories() {
  const [categorie, setcategorie] = useState([]);
  const nav = useNavigate();

  const rediriger = (item) => {
    nav("/professionnel", { state: { spec: item.nom } });
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
    <div>
      <h1>Nos Catégories</h1>
      <div className="allcategorie">
        {categorie.map((item, index) => (
          <div
            className="all-top-card"
            key={index}
            onClick={() => rediriger(item)}
          >
            <div className="all-card-cat">
              <img className="all-card-image top" src={item.image} alt="" />
            </div>
            <div className="all-top-card-text">
              <h2>{item.nom}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
