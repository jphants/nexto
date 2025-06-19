import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewAdd: React.FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [endDate, setEndDate] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const businessUser = JSON.parse(localStorage.getItem("businessUser") || "{}")
    const businessId = businessUser?.id

    if (!businessId) {
      setError("Debes iniciar sesión para crear un anuncio.")
      return
    }

    try {
      const res = await fetch("http://localhost:3001/newadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          endDate,
          businessId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Error al crear el anuncio.")
      }
      setMessage("¡Anuncio creado con éxito!")
      setTitle("")
      setDescription("")
      setEndDate("")
      navigate("/ads")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Nuevo Anuncio</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre del anuncio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Breve descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <button type="submit" style={styles.button}>Crear Anuncio</button>
      </form>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 24,
    border: "1px solid #ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  success: {
    color: "green",
    fontSize: "14px",
  },
}
