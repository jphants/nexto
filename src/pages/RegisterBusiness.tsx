import React, { useEffect, useState } from "react"

interface FormData {
  name: string
  description: string
  ruc: string
  email: string
  password: string
  confirmPassword: string
}

export const BusinessRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    ruc: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [coords, setCoords] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null })
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada por tu navegador.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoords({ lat: latitude, lon: longitude })
      },
      () => {
        setError("No se pudo obtener tu ubicación.")
      }
    )
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    if (coords.lat === null || coords.lon === null) {
      setError("Ubicación no disponible.")
      return
    }

    setError(null)

    try {
      const res = await fetch("http://localhost:3001/registerbusiness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          ruc: formData.ruc,
          email: formData.email,
          latitude: coords.lat,
          longitude: coords.lon,
          password: formData.password,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al registrar.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.")
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Empresa</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Nombre de la empresa" value={formData.name} onChange={handleChange} style={styles.input} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} style={styles.input} required />
        <input name="ruc" placeholder="RUC" value={formData.ruc} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} style={styles.input} required />
        <input disabled value={coords.lat && coords.lon ? `${coords.lat}, ${coords.lon}` : "Obteniendo ubicación..."} style={styles.input} />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} style={styles.input} required />
        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} style={styles.input} required />

        {error && <p style={styles.error}>{error}</p>}
        {submitted && <p style={styles.success}>¡Registro exitoso!</p>}

        <button type="submit" style={styles.button}>Registrar</button>
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
