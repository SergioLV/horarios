import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Horario from "./components/Horario";
import Oferta from "./components/Oferta";
// import Footer from "./components/Footer";
import NewScheduler from "./components/NewScheduler";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/nh" element={<NewScheduler />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
