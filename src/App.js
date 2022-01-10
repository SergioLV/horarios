import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./views/navbar/Navbar";
import Home from "./views/home/Home";
import Horario from "./views/create-schedule/Horario";
import Oferta from "./views/oferta/Oferta";
// import Footer from "./components/Footer";
import NewScheduler from "./views/create-schedule/components/Scheduler";

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
