import React, { useState } from "react";

import Scheduler from "../create-schedule/components/Scheduler";
import UserSelection from "../create-schedule/components/UserSelection";
import Footer from "../footer/Footer";

function GenerarHorarios() {
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
        <Scheduler cursos={cursos} />
        <UserSelection />
        <Footer inScheduler={true} />
      </div>
    </div>
  );
}

export default GenerarHorarios;
