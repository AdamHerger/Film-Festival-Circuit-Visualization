import { Link } from "react-router-dom";

function NavBar({ setCurrentPage, currentPage }) {
  return (
    <nav className="navbar">
      <button className="nav-link" onClick={() => setCurrentPage("home")}>
        Home
      </button>
      <button className="nav-link" onClick={() => setCurrentPage("about")}>
        About
      </button>
    </nav>
  );
}

export default NavBar;
