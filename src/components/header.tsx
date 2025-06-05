import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="logo-button" onClick={() => navigate("/")}>
        Nexto
      </button>
      <nav className="nav">
        <button className="primary-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="primary-button" onClick={() => navigate("/register")}>
          Register
        </button>
        <button className="intensive-button" onClick={() => navigate("/formPage")}>
          New entry
        </button>
      </nav>
    </header>
  );
};

export default Header;