import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./Map.css";

const API_URL = "http://localhost:3001/ads";

type Ad = {
  id: number;
  title: string;
  description: string;
  end_date: string;
  businessName: string;
  latitude: number;
  longitude: number;
};

// Configurar íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const sections = {
  section1: {
    title: "Zona Norte",
    description: "Área residencial con parques y escuelas.",
    duration: 600,
    position: [19.45, -99.15],
  },
  section2: {
    title: "Centro Histórico",
    description: "Zona turística con muchos restaurantes.",
    duration: 1500,
    position: [19.4326, -99.1332],
  },
  section3: {
    title: "Zona Industrial",
    description: "Área de fábricas y almacenes.",
    duration: 300,
    position: [19.4, -99.12],
  },
} as const;

type SectionKey = keyof typeof sections;

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15);
  }, [position, map]);
  return null;
};

const Map = () => {
  // Removed activeSection and related state
  const [activeAdId, setActiveAdId] = useState<number | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [ads, setAds] = useState<Ad[]>([]);

  const fetchAds = async () => {
    try {
      const res = await axios.get(API_URL);
      setAds(res.data.ads || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Obtener ubicación del usuario
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition([latitude, longitude]);
          setLoadingLocation(false);
        },
        (err) => {
          console.error("Error obteniendo ubicación:", err);
          setLoadingLocation(false); // Aunque falle, quitar el loading
        }
      );
    } else {
      console.warn("Geolocalización no soportada.");
      setLoadingLocation(false);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAdClick = (adId: number) => {
    setActiveAdId(adId);
  };

  useEffect(() => {
    // Removed intervalId cleanup as intervalId state was removed
  }, []);

  const renderSection = () => {
    // Removed renderSection as activeSection state was removed
    return null;
  };

  return (
  <div className="mapWrapper">
    {/* Botones encima del mapa */}
      <div className="mapBottomBarFull">
        {/* Removed zone buttons and info bar */}
      </div>

    {!loadingLocation && (
      <MapContainer
        center={userPosition || [19.4326, -99.1332]}
        zoom={13}
        className="mapContainer"
      >
        <TileLayer
          attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>Tu ubicación actual</Popup>
          </Marker>
        )}
        {Object.entries(sections).map(([key, section]) => (
          <Marker key={key} position={section.position as [number, number]}>
            <Popup>
              <strong>{section.title}</strong>
              <br />
              {section.description}
            </Popup>
          </Marker>
        ))}

        {ads.map((ad) => (
          <Marker
            key={ad.id}
            position={[ad.latitude, ad.longitude]}
            opacity={activeAdId === ad.id ? 1 : 0.6}
          >
            <Popup>
              <strong>{ad.title}</strong>
              <br />
              {ad.description}
              <br />
              <em>Empresa: {ad.businessName}</em>
              <br />
              <small>Finaliza: {new Date(ad.end_date).toLocaleString()}</small>
            </Popup>
          </Marker>
        ))}

        {activeAdId !== null && (() => {
          const activeAd = ads.find(ad => ad.id === activeAdId);
          if (!activeAd) return null;
          return <FlyToLocation position={[activeAd.latitude, activeAd.longitude]} />;
        })()}
      </MapContainer>
    )}

    <div className="postsContainer">
      <div className="zoneButtons">
        {ads.map((ad) => (
          <button
            key={ad.id}
            onClick={() => handleAdClick(ad.id)}
            className={activeAdId === ad.id ? "active" : ""}
          >
            {ad.title}
          </button>
        ))}
      </div>
    </div>
  </div>
);
};

export default Map;