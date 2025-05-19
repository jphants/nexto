import React from "react";

// Variables de color para facilitar el control del estilo
const colors = {
  background: " #5B5B5B",       // gris neutro
  border: " #000000",           // negro discreto para bordes
  textPrimary: " #000000",      // texto principal
  textSecondary: " #333333",    // texto secundario
  buttonBg: " #E0E0E0",         // fondo del botón
  buttonText: " #1C1C1C",       // texto del botón
  buttonBorder: " #B0B0B0",     // borde del botón
};

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>Nexto</h1>
      <nav style={styles.nav}>
        <button style={styles.loginButton}>Login</button>
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
