import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/home";
import About from "./pages/About";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
