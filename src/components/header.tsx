import React from "react";
import { useNavigate } from "react-router-dom";

const colors = {
  background: "#5B5B5B",
  border: "#000000",
  textPrimary: "#000000",
  textSecondary: "#333333",
  buttonBg: "#E0E0E0",
  buttonText: "#1C1C1C",
  buttonBorder: "#B0B0B0",
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
    <h1
        style={{ ...styles.logo, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Nexto
      </h1>
      <nav style={styles.nav}>
        <button style={styles.loginButton} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.loginButton} onClick={() => navigate("/register")}>
          Register
        </button>
      </nav>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: colors.background,
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${colors.border}`,
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: colors.textPrimary,
    margin: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  loginButton: {
    backgroundColor: colors.buttonBg,
    color: colors.buttonText,
    border: `1px solid ${colors.buttonBorder}`,
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "1rem",
  },
};

export default Header;
