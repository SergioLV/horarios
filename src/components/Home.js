import React from "react";
import { Link } from "react-router-dom";
import Typical from "react-typical";
import Footer from "./Footer";

function Home() {
  return (
    <div className="page__content">
      <div className="home__content">
        <div className="home__title">
          <Typical
            steps={[
              "Crea tu horario",
              1000,
              "Simula tu horario",
              1000,
              "Revisa la oferta",
              1000,
            ]}
            loop={Infinity}
            wrapper="p"
          />
          <h1>
            Crea tu horario y revisa la oferta académica UDP <br /> desde un
            solo lugar!
          </h1>
        </div>
        <div className="home__buttons">
          <button className="home__horario__button">
            <Link
              to="/horario"
              style={{
                textDecoration: "none",
                color: "#FFF",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              Crea tu Horario
            </Link>
          </button>
          <button className="home__oferta__button">
            <Link
              to="/oferta"
              style={{
                textDecoration: "none",
                color: "#FFF",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              {" "}
              Ver Oferta
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
