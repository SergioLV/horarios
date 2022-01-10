import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./views/navbar/Navbar";
import Home from "./views/home/Home";
import Horario from "./views/create-schedule/Horario";
import Oferta from "./views/oferta/Oferta";
import GenerarHorarios from "./views/generate-schedules/GenerarHorarios";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/generador-de-horarios" element={<GenerarHorarios />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
