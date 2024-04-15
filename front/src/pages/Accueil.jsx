import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories/Categories";
import Info from "../Components/Infos/Info";
import Search from "../Components/Search/Search";
import Slider from "../Components/Slider/Slider";
import Stats from "../Components/Stats/Stats";
import Footer from "../Components/Footer/Footer";
import Verifpage from "../Components/VerifPage/Verifpage";

export default function Accueil() {
  const authToken = localStorage.getItem("auth-token");
  const [userData, setuserData] = useState({});

  const getUserinfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setuserData(userData);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUserinfo();
  }, []);
  return (
    <div>
      {userData.verified == "false" ? (
        <Verifpage />
      ) : (
        <div>
          <Slider />
          <Search />
          <Info />
          <Stats />
          <Categories />
          <Footer />
        </div>
      )}
    </div>
  );
}
