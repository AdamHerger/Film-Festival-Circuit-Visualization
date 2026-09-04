import { useState } from "react";
import "./css/App.css";
import Home from "./pages/home";
import About from "./pages/About";
import NavBar from "./components/NavBar";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="main-content">
        <div style={{ display: currentPage === "home" ? "block" : "none" }}>
          <Home />
        </div>
        <div style={{ display: currentPage === "about" ? "block" : "none" }}>
          <About />
        </div>
      </main>
    </div>
  );
}

export default App;
