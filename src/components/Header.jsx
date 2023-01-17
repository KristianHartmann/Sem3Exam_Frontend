import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import facade from "../apiFacade";
import jwtDecode from "jwt-decode";
import "../styles/header.css";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const fToken = facade.getToken();
  let isAdmin = false;

  if(fToken){
    const token = jwtDecode(fToken)?.roles;
    isAdmin = token?.toLowerCase()?.includes("admin");
  }

  useEffect(() => {
    setLoggedIn(fToken != null);
  }, [fToken]); 

  return (
    <nav className="navbar">
      <NavLink className="active" to="/">
        <i className="fa fa-fw fa-home"></i> Home
      </NavLink>
      <NavLink to="/search">
        <i className="fa fa-fw fa-search"></i> Search
      </NavLink>
      {loggedIn ? (
        <NavLink to="/" onClick={() => {
          facade.logout();
          setLoggedIn(false);
          setIsAdmin(false);
          localStorage.removeItem('jwtToken')
        }}>
          <i className="fa fa-fw fa-user"></i> Logout
        </NavLink>
      ) : (
        <NavLink to="/login">
          <i className="fa fa-fw fa-user"></i> Login
        </NavLink>
      )}
      {!loggedIn && !isAdmin ? (
        <NavLink to="/register">
          <i className="fa fa-fw fa-user"></i> Register
        </NavLink>
      ) : null}
      {loggedIn && isAdmin ? (
        <NavLink to="/admin">
          <i className="fa fa-fw fa-cogs"></i> Admin Page
        </NavLink>
      ) : null}
    </nav>
  );
      }

export default Header;
