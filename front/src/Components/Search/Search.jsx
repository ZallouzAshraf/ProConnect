import React from "react";
import "./Search.css";

export default function Search() {
  return (
    <div>
      <div className="search">
        <input type="search" placeholder="Nom du Professionnel" />
        <select>
          <option value="">Spécialité </option>
          <option value="option1">Spécialité 1</option>
          <option value="option2">Spécialité 2</option>
          <option value="option3">Spécialité 3</option>
        </select>
        <select>
          <option value="">Ville </option>
          <option value="option1">Ville 1</option>
          <option value="option2">Ville 2</option>
          <option value="option3">Ville 3</option>
        </select>
        <button>Rechercher</button>
      </div>
    </div>
  );
}
