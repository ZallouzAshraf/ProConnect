import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { villedata } from "../Data/data";
import "./Search.css";
import axios from "axios";

export default function Search() {
  const [searchSpec, setSearchSpec] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchVille, setSearchVille] = useState("");
  const [categorie, setcategorie] = useState([]);

  const nav = useNavigate();

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
  const rediriger = () => {
    nav("/professionnel", { state: { searchName, searchSpec, searchVille } });
  };
  return (
    <div>
      <div className="search">
        <div className="form-control">
          <input
            type="search"
            className="input input-alt"
            placeholder="Nom du Professionnel"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <span className="input-border input-border-alt"></span>
        </div>
        <div className="selectSpec">
          <select
            value={searchSpec}
            onChange={(e) => setSearchSpec(e.target.value)}
          >
            <option value="">Spécialité</option>
            {categorie.map((item, index) => (
              <option key={index} value={item.nom}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="selectSpec">
          <select
            value={searchVille}
            onChange={(e) => setSearchVille(e.target.value)}
          >
            <option value="">Ville</option>
            {villedata.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button onClick={rediriger}>Rechercher</button>
      </div>
    </div>
  );
}
