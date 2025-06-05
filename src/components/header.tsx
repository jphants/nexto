import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName(null);
    navigate("/");
  };

  return (
    <header className="header">
      <button className="logo-button" onClick={() => navigate("/")}>
        Nexto
      </button>
      <nav className="nav">
        {userName ? (
          <>
            <span className="welcome-text">Bienvenido, {userName}</span>
            <button className="primary-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
            <button className="intensive-button" onClick={() => navigate("/formPage")}>
              New entry
            </button>
          </>
        ) : (
          <>
            <button className="primary-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="primary-button" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
