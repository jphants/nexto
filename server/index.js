// index.js
import express from "express"
import cors from "cors"
import db from "./db.js"

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post("/registerbusiness", (req, res) => {
  const { name, description, ruc, email, latitude, longitude, password } = req.body

  if (!name || !ruc || !email || !password || latitude == null || longitude == null) {
    return res.status(400).json({ message: "Campos obligatorios faltantes." })
  }

  const sql = `
    INSERT INTO businesses (name, description, ruc, email, latitude, longitude, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  db.run(sql, [name, description, ruc, email, latitude, longitude, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ message: "RUC o correo ya registrados." })
      }
      return res.status(500).json({ message: "Error al registrar el negocio." })
    }

    res.status(201).json({ message: "Negocio registrado con éxito", id: this.lastID })
  })
})

app.post("/loginbusiness", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos." })
  }

  const sql = "SELECT * FROM businesses WHERE email = ? AND password = ?"

  db.get(sql, [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Error del servidor." })
    }

    if (!row) {
      return res.status(401).json({ message: "Credenciales inválidas." })
    }

    res.status(200).json({ message: "Login exitoso", business: row })
  })
})

app.post("/newadd", (req, res) => {
  const { title, description, endDate, businessId } = req.body

  if (!title || !description || !endDate || !businessId) {
    return res.status(400).json({ message: "Faltan campos obligatorios." })
  }

  const sql = `
    INSERT INTO ads (title, description, end_date, business_id)
    VALUES (?, ?, ?, ?)
  `

  db.run(sql, [title, description, endDate, businessId], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error al crear el anuncio." })
    }

    res.status(201).json({ message: "Anuncio creado con éxito", id: this.lastID })
  })
})

app.get("/ads", (req, res) => {
  const sql = `
    SELECT ads.*, businesses.name AS businessName
    FROM ads
    JOIN businesses ON ads.business_id = businesses.id
    WHERE datetime(ads.end_date) > datetime('now')
    ORDER BY ads.end_date ASC
  `

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("SQL Error on /ads:", err)
      return res.status(500).json({ message: "Error al obtener anuncios." })
    }

    res.status(200).json({ ads: rows })
  })
})



app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
})
