import React, { useState, useEffect } from "react";

import NewScheduler from "./NewScheduler";
import UserSelection from "./UserSelection";
import Footer from "./Footer";

function Horario() {
  const [cursos, setCursos] = useState({
    lunes: ["Electricidad y Magnetismo", "", "Electronica"],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
  });
  return (
    <div className="horario__content">
      <div className="page__content">
        <NewScheduler cursos={cursos} />
        <UserSelection />
        <Footer inScheduler={true} />
      </div>
    </div>
  );
}

export default Horario;
