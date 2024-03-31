import React, { useState } from "react";
import "./Professionnel.css";
import Procard from "../ProCard/Procard";
import { professionnels } from "../Data/data";

export default function Professionnel() {
  const [searchName, setSearchName] = useState("");
  const [searchSpec, setSearchSpec] = useState("");
  const [searchVille, setSearchVille] = useState("");

  const filteredProfessionnels = professionnels.filter((prof) => {
    return (
      prof.nom.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchSpec === "" || prof.spec === searchSpec) &&
      (searchVille === "" || prof.ville === searchVille)
    );
  });

  return (
    <div>
      <div className="professionnel">
        <div className="search-option">
          <h1>Filtrer Par : </h1>
          <hr />
          <input
            type="search"
            placeholder="Nom du Professionnel"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <select
            value={searchSpec}
            onChange={(e) => setSearchSpec(e.target.value)}
          >
            <option value="">Spécialité</option>
            {Array.from(new Set(professionnels.map((prof) => prof.spec))).map(
              (spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              )
            )}
          </select>
          <select
            value={searchVille}
            onChange={(e) => setSearchVille(e.target.value)}
          >
            <option value="">Ville</option>
            {Array.from(new Set(professionnels.map((prof) => prof.ville))).map(
              (ville, index) => (
                <option key={index} value={ville}>
                  {ville}
                </option>
              )
            )}
          </select>
          <select>
            <option value="">Genre</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
          <button>Rechercher</button>
        </div>
        <div className="search-result">
          {filteredProfessionnels.map((item, index) => {
            return (
              <Procard
                key={index}
                nom={item.nom}
                spec={item.spec}
                ville={item.ville}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
