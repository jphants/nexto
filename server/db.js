// db.js
import sqlite3 from "sqlite3"
const db = new sqlite3.Database("./businesses.db")

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS businesses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      ruc TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      latitude REAL,
      longitude REAL,
      password TEXT NOT NULL
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS ads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      end_date TEXT NOT NULL,
      business_id INTEGER NOT NULL,
      FOREIGN KEY (business_id) REFERENCES businesses(id)
    )
  `)
})



export default db
