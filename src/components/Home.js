import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page__content">
      <div className="home__content">
        <div className="home__title">
          <h1>
            Crea tu horario y revisa la oferta académica UDP <br /> desde un
            solo lugar!
          </h1>
        </div>
        <div className="home__buttons">
          <button className="home__horario__button">
            <Link
              to="/horario"
              style={{ textDecoration: "none", color: "#FFF" }}
            >
              Crea tu Horario
            </Link>
          </button>
          <button className="home__oferta__button">
            <Link
              to="/oferta"
              style={{ textDecoration: "none", color: "#FFF" }}
            >
              {" "}
              Ver Oferta
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
