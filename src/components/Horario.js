import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Schedule from "./Schedule";
import NewScheduler from "./NewScheduler";
import UserSelection from "./UserSelection";
import Footer from "./Footer";

function Horario() {
  return (
    <div className="horario__content">
      {/* <div className="scheduler__description">
        <p>
          Esto es la descripcion Esto es la descripcion Esto es la descripcion{" "}
          Esto es la descripcion
          <br />
          Esto es la descripcion Esto es la descripcion Esto es la descripcion
          Esto es la descripcion
          <br />
          Esto es la descripcion Esto es la descripcion Esto es la descripcion
          Esto es la descripcion
          <br />
          Esto es la descripcion Esto es la descripcion Esto es la descripcion
          Esto es la descripcion
          <br />
          Esto es la descripcion Esto es la descripcion Esto es la descripcion
          Esto es la descripcion
          <br />
          Esto es la descripcion Esto es la descripcion Esto es la descripcion
          Esto es la descripcion
        </p>
      </div> */}
      <div className="page__content">
        <NewScheduler />
        {/* <Schedule /> */}
        <UserSelection />
        <Footer inScheduler={true} />
      </div>
    </div>
  );
}

export default Horario;
