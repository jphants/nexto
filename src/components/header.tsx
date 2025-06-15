import React, { useEffect, useState } from "react"

export const Header: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("businessUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const toggleLoginMenu = () => {
    setLoginOpen(!loginOpen)
    setRegisterOpen(false)
  }

  const toggleRegisterMenu = () => {
    setRegisterOpen(!registerOpen)
    setLoginOpen(false)
  }

  const logout = () => {
    localStorage.removeItem("businessUser")
    setUser(null)
    window.location.href = "/" // o usar navigate si estás en router
  }

  return (
    <header style={styles.header}>
      <div style={styles.left}>COW</div>

      <div style={styles.right}>
        {user ? (
          <>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              Bienvenido, {user.name}
            </span>
            <a href="/newadd" style={styles.button}>New Add</a>
            <button onClick={logout} style={styles.button}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <div style={styles.dropdownContainer}>
              <button onClick={toggleLoginMenu} style={styles.button}>Login</button>
              {loginOpen && (
                <div style={styles.dropdown}>
                  <a href="/login/business" style={styles.dropdownItem}>Business</a>
                  <a href="/login/customer" style={styles.dropdownItem}>Customer</a>
                </div>
              )}
            </div>

            <div style={styles.dropdownContainer}>
              <button onClick={toggleRegisterMenu} style={styles.button}>Register</button>
              {registerOpen && (
                <div style={styles.dropdown}>
                  <a href="/register/business" style={styles.dropdownItem}>Business</a>
                  <a href="/register/customer" style={styles.dropdownItem}>Customer</a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  left: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  right: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#000",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "110%",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    zIndex: 999,
  },
  dropdownItem: {
    display: "block",
    padding: "8px 12px",
    textDecoration: "none",
    color: "#333",
    whiteSpace: "nowrap",
  },
}
