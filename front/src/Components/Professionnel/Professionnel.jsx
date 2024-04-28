import React, { useEffect, useState } from "react";
import "./Professionnel.css";
import Procard from "../ProCard/Procard";
import { professionnels } from "../Data/data";
import { useLocation } from "react-router-dom";
import homme from "../../Assets/homme.png";
import femme from "../../Assets/femme.png";
import axios from "axios";

export default function Professionnel() {
  const { state } = useLocation();
  const { searchName, searchSpec, searchVille, spec } = state || {};
  const [Name, setName] = useState(searchName || "");
  const [prenom, setprenom] = useState("");
  const [Spec, setSpec] = useState(spec || searchSpec || "");
  const [Ville, setVille] = useState(searchVille || "");
  const [Genre, setGenre] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchProfessionals = async () => {
    let response;
    try {
      if (userId) {
        response = await axios.get(
          `http://localhost:4000/professionals?userId=${userId}`
        );
      } else {
        response = await axios.get(`http://localhost:4000/allprofessionals`);
      }

      setProfessionals(response.data.data);
    } catch (error) {
      console.log("Erreur");
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);
  const resetFilters = () => {
    setName("");
    setSpec("");
    setVille("");
    setGenre("");
    setprenom("");
  };
  const filteredProfessionnels = professionals.filter((prof) => {
    return (
      prof.nom.toLowerCase().includes(Name.toLowerCase()) &&
      prof.prenom.toLowerCase().includes(prenom.toLowerCase()) &&
      (Spec === "" || prof.profession === Spec) &&
      (Ville === "" || prof.ville === Ville) &&
      (Genre === "" || prof.sexe === Genre)
    );
  });

  useEffect(() => {
    if (!searchName) {
      setName("");
    }
    if (!searchSpec && !spec) {
      setSpec("");
    }
    if (!searchVille) {
      setVille("");
    }
  }, [searchName, searchSpec, searchVille, spec]);

  return (
    <div>
      <div className="professionnel">
        <div className="search-option">
          <h1>Filtrer Par :</h1>
          <hr />
          <input
            type="search"
            placeholder="Nom du Professionnel"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="search"
            placeholder="Prénom du Professionnel"
            value={prenom}
            onChange={(e) => setprenom(e.target.value)}
          />
          <select value={Spec} onChange={(e) => setSpec(e.target.value)}>
            <option value="">Spécialité</option>
            {Array.from(
              new Set(professionals.map((prof) => prof.profession))
            ).map((profession, index) => (
              <option key={index} value={profession}>
                {profession}
              </option>
            ))}
          </select>
          <select value={Ville} onChange={(e) => setVille(e.target.value)}>
            <option value="">Ville</option>
            {Array.from(new Set(professionnels.map((prof) => prof.ville))).map(
              (ville, index) => (
                <option key={index} value={ville}>
                  {ville}
                </option>
              )
            )}
          </select>
          <select value={Genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Genre</option>
            <option value="male">Homme</option>
            <option value="Female">Femme</option>
          </select>
          <button onClick={resetFilters}>Réinitialiser</button>
        </div>
        <div className="search-result">
          {filteredProfessionnels.map((item, index) => {
            return (
              <Procard
                img={item.sexe === "male" ? homme : femme}
                key={index}
                nom={item.nom}
                email={item.email}
                prenom={item.prenom}
                phone={item.telephone}
                spec={item.profession}
                ville={item.ville}
                description={item.description}
                genre={item.sexe}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
