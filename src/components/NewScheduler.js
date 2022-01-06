import React from "react";

function NewScheduler({ cursos }) {
  return (
    <div className="page__content">
      <div className="table__container">
        <table classname="bordered">
          <tr className="days">
            <th></th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
          </tr>
          <tr>
            <td className="hours">8:30</td>
            <td>{cursos.lunes[0]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">10:00</td>
            <td>{cursos.lunes[1]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">11:30</td>
            <td>{cursos.lunes[2]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">13:00</td>
            <td>{cursos.lunes[3]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">14:30</td>
            <td>{cursos.lunes[4]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">16:00</td>
            <td>{cursos.lunes[5]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">17:30</td>
            <td>{cursos.lunes[6]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">18:50</td>
            <td>{cursos.lunes[7]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">20:15</td>
            <td>{cursos.lunes[8]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="hours">21:40</td>
            <td>{cursos.lunes[9]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default NewScheduler;
