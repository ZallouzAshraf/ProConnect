import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { professionnels } from "../Data/data";

export default function Search() {
  const [searchSpec, setSearchSpec] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchVille, setSearchVille] = useState("");
  const nav = useNavigate();

  const rediriger = () => {
    nav("/professionnel", { state: { searchName, searchSpec, searchVille } });
  };
  return (
    <div>
      <div className="search">
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
        <button onClick={rediriger}>Rechercher</button>
      </div>
    </div>
  );
}
