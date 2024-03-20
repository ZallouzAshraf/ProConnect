import React from "react";
import "./Stats.css";
import Card from "../Card/Card";
import views from "../../Assets/views.png";
import people from "../../Assets/equipe.png";
import convention from "../../Assets/convention.png";

export default function Stats() {
  return (
    <div className="stats">
      <Card img={views} title="Views" nombre="5,263" />
      <Card img={people} title="Users" nombre="1,602" />
      <Card img={convention} title="Accomplissements" nombre="725" />
    </div>
  );
}
