import React, { useEffect, useState } from "react";
import "./Professionnel.css";
import Procard from "../ProCard/Procard";
import { professionnels } from "../Data/data";
import { useLocation } from "react-router-dom";
import homme from "../../Assets/homme.png";
import femme from "../../Assets/femme.png";

export default function Professionnel() {
  const { state } = useLocation();
  const { searchName, searchSpec, searchVille, spec } = state || {};
  const [Name, setName] = useState(searchName || "");
  const [Spec, setSpec] = useState(spec || searchSpec || "");
  const [Ville, setVille] = useState(searchVille || "");
  const [Genre, setGenre] = useState("");

  const filteredProfessionnels = professionnels.filter((prof) => {
    return (
      prof.nom.toLowerCase().includes(Name.toLowerCase()) &&
      (Spec === "" || prof.spec === Spec) &&
      (Ville === "" || prof.ville === Ville) &&
      (Genre === "" || prof.genre === Genre)
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
          <h1>Filtrer Par : </h1>
          <hr />
          <input
            type="search"
            placeholder="Nom du Professionnel"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <select value={Spec} onChange={(e) => setSpec(e.target.value)}>
            <option value="">Spécialité</option>
            {Array.from(new Set(professionnels.map((prof) => prof.spec))).map(
              (spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              )
            )}
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
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
          <button>Rechercher</button>
        </div>
        <div className="search-result">
          {filteredProfessionnels.map((item, index) => {
            return (
              <Procard
                img={item.genre === "Homme" ? homme : femme}
                key={index}
                nom={item.nom}
                spec={item.spec}
                ville={item.ville}
                description={item.description}
                genre={item.genre}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
