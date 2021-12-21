import React from "react";
import { NavLink } from "react-router-dom";

function navbar() {
  return (
    <nav className="navbar">
      <NavLink className="router__link" to="/">
        <div className="title">
          <h1>Horarios FIC</h1>
        </div>
      </NavLink>
      <div className="links">
        <NavLink
          className={({ isActive }) =>
            isActive ? "router__link active__link" : ""
          }
          to="/horario"
        >
          <h2 className="first_link">Haz tu horario</h2>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "router__link active__link__2" : ""
          }
          to="/oferta"
        >
          <h2 className="second_link">Oferta académica</h2>
        </NavLink>
      </div>
    </nav>
  );
}

export default navbar;
