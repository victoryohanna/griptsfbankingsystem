import React from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";

function NavBar() {
  return (
      <div className="nav-body">
          <div className="container">
          <nav className="navbar navbar-expand-lg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
        <FaAlignJustify className="nav-icon" />
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav my-4">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/customers" className="nav-link">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transfer" className="nav-link">
              Fund Transfer
            </Link>
          </li>
        </ul>
      </div>
    </nav>
          </div>

      </div>
    
  );
}

export default NavBar;
