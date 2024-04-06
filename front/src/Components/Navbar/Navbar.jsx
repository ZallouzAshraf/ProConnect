import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/logonv.png";
import { FaAlignJustify } from "react-icons/fa6";

export default function Navbar() {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="" />
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
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
                to="/about"
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
          </ul>
          <ul className="nav-menu-right">
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
            <hr />
            <li>
              <Link to="/RegisterType">S'inscrire</Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <FaAlignJustify color="white" />
          </div>
        </div>
      </nav>
    </div>
  );
}
