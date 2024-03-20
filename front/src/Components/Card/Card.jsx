import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div>
      <div className="card">
        <img src={props.img} alt="" />
        <div className="details">
          <p>{props.title}</p>
          <h4>{props.nombre}</h4>
        </div>
      </div>
    </div>
  );
}
