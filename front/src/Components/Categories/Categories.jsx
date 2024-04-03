import React from "react";
import "./Categories.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { topmetier, responsive } from "../Data/data";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Categories() {
  const cardCategorie = topmetier.map((item, index) => (
    <div className="top-card" key={index}>
      <div className="card-cat">
        <img className="card-image top" src={item.img} alt="" />
      </div>
      <div className="top-card-text">
        <h2>{item.title}</h2>
      </div>
    </div>
  ));
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="categorie">
      <h1>Focus sur les Experts</h1>
      <Carousel showDots={true} responsive={responsive} infinite={true}>
        {cardCategorie}
      </Carousel>
      <Link to="/allcategories">
        <button className="cat-plus" onClick={scrollToTop}>
          Voir Plus <FaArrowRight className="arrow-ic" />
        </button>
      </Link>
    </div>
  );
}
