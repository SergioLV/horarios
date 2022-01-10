import React, { useState } from "react";

import NewScheduler from "./components/Scheduler";
import UserSelection from "./components/UserSelection";
import Footer from "../footer/Footer";

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
