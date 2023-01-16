import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import facade from "../apiFacade";
import "../styles/header.css";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn);



  useEffect(() => {
    const token = facade.loggedIn();
    setLoggedIn(token != null);
  }, []);


  return (
    <nav className="navbar">
      <NavLink className="active" to="/">
        <i className="fa fa-fw fa-home"></i> Home
      </NavLink>
      <NavLink to="/search">
        <i className="fa fa-fw fa-search"></i> Search
      </NavLink>
      {!loggedIn ? (
        <NavLink to="/" onClick={facade.logout}>
          <i className="fa fa-fw fa-user"></i> Logout
        </NavLink>
      ) : (
        <NavLink to="/login">
          <i className="fa fa-fw fa-user"></i> Login
        </NavLink>
      )}
      {loggedIn ? (
        <NavLink to="/register">
          <i className="fa fa-fw fa-user"></i> Register
        </NavLink>
      ) : null}
    </nav>
  );
};

export default Header;
