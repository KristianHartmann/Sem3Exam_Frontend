import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/header.css";

const Header = (props) => {
  // const location = useLocation();
  // console.log(location);
  return (
    <nav className="navbar">
      <NavLink className="active" to="/">
        <i className="fa fa-fw fa-home"></i> Home
      </NavLink>
      <NavLink to="/search">
        <i className="fa fa-fw fa-search"></i> Search
      </NavLink>
      <NavLink to="/login">
        <i className="fa fa-fw fa-user"></i> Login
      </NavLink>
    </nav>
  );
};

export default Header;
