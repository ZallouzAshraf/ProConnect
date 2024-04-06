import React from "react";
import "./Allcategories.css";
import { data } from "../../Components/Data/data";
import { useNavigate } from "react-router-dom";

export default function Allcategories() {
  const nav = useNavigate();

  const rediriger = (item) => {
    nav("/professionnel", { state: { spec: item.title } });
  };

  return (
    <div>
      <h1>Nos Catégories</h1>
      <div className="allcategorie">
        {data.map((item, index) => (
          <div
            className="all-top-card"
            key={index}
            onClick={() => rediriger(item)}
          >
            <div className="all-card-cat">
              <img className="all-card-image top" src={item.img} alt="" />
            </div>
            <div className="all-top-card-text">
              <h2>{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
