import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/logonv.png";
import { FaAlignJustify } from "react-icons/fa6";
import utilisateur from "../../Assets/utilisateur.png";

export default function Navbar() {
  const [click, setClick] = React.useState(false);
  const [checkadmin] = useState(localStorage.getItem("role") || "");

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="" />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {checkadmin === "admin" ? (
              <></>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/About"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/blog"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Contact"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Contact
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="nav-menu-right">
            {localStorage.getItem("auth-token") ? (
              <div className="profil-logout">
                {checkadmin === "admin" ? (
                  <></>
                ) : (
                  <Link to="/Profil">
                    <img src={utilisateur} alt="" className="profilbtn" />
                  </Link>
                )}
                <button
                  className="btnlogout"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("role");
                    localStorage.removeItem("email");
                    window.location.replace("/");
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <ul className="nav-menu-right">
                <li>
                  <Link to="/login">Se connecter</Link>
                </li>
                <hr />
                <li>
                  <Link to="/RegisterType">S'inscrire</Link>
                </li>
              </ul>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <FaAlignJustify color="white" />
          </div>
        </div>
      </nav>
    </div>
  );
}
