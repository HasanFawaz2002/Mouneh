import React, { useState } from "react";
import "./Navbar.css";
import { NavLink,useLocation  } from "react-router-dom";
import MounehLogo from "../../images/Mouneh-logo.png";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 
  const isProductPage = location.pathname.startsWith("/product/");

  const menuOnClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div id="menu">
        <div
          id="menu-bar"
          onClick={menuOnClick}
          className={isMenuOpen ? "change" : ""}
        >
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
        <nav className={isMenuOpen ? "nav change" : "nav"} id="nav">
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            <li>
            {isProductPage && <NavLink to="/cart">My Cart</NavLink>}
            {!isProductPage && <NavLink to="/editprofile">Edit Profile</NavLink>}
            </li>
            <li>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={closeMenu}>
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={isMenuOpen ? "menu-bg change-bg" : "menu-bg"}
        id="menu-bg"
      ></div>

      <nav className="navbar">
        <div className="logo">
          <img src={MounehLogo} alt="" />
        </div>
        <ul className="navbar-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <div className="authentication-btn">
          {isProductPage && <NavLink to="/cart">My Cart</NavLink>}
          {!isProductPage && <NavLink to="/editprofile">Edit Profile</NavLink>}
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
