import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHander = () => {
    auth.logout();
    toast.success("Logout Successfully!");
    navigate("/auth");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">SIGN IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={logoutHander} id="logout-btn">
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
