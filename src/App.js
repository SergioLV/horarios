import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Horario from "./components/Horario";
import Oferta from "./components/Oferta";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
