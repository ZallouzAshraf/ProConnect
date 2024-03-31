import React from "react";
import Categories from "../Components/Categories/Categories";
import Info from "../Components/Infos/Info";
import Search from "../Components/Search/Search";
import Slider from "../Components/Slider/Slider";
import Stats from "../Components/Stats/Stats";

export default function Accueil() {
  return (
    <div>
      <Slider />
      <Search />
      <Info />
      <Stats />
      <Categories />
    </div>
  );
}
