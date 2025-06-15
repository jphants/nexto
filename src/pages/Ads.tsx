import React, { useEffect, useState } from "react"

interface Ad {
  id: number
  title: string
  description: string
  end_date: string
  businessName: string
}

export const AdsNearby: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/ads")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener anuncios")
        return res.json()
      })
      .then(data => {
        setAds(data.ads || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>
  if (ads.length === 0) return <p>No hay anuncios disponibles.</p>

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Anuncios activos</h2>
      {ads.map((ad) => (
        <div key={ad.id} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12, borderRadius: 8 }}>
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
          <p><strong>Empresa:</strong> {ad.businessName}</p>
          <p><strong>Finaliza:</strong> {new Date(ad.end_date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
