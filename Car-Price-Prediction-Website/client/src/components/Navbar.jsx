import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CarFront, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-icon"><CarFront size={22} /></span>
          <span>Auto<span>Predict</span></span>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/predict" onClick={close}>Predict</NavLink>
          <NavLink to="/dashboard" onClick={close}>Dashboard</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>

        <Link className="nav-cta" to="/predict">Try Predictor</Link>
      </div>
    </header>
  );
}
