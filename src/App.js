import "./App.css";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";
import UserSelection from "./components/UserSelection";

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="page__content">
        <Schedule />
        <UserSelection />
      </div>
    </div>
  );
}

export default App;
