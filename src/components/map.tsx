import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./Map.css";

const API_URL = "http://localhost:3001/posts";

type Post = {
  id: number;
  title: string;
  content: string;
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
};

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15);
  }, [position, map]);
  return null;
};

const Map = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
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

  const handleSectionClick = (key: string) => {
    if (intervalId) clearInterval(intervalId);
    setActiveSection(key);
    setTimeLeft(sections[key as keyof typeof sections].duration);
    const newInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(newInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(newInterval);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const renderSection = () => {
    if (!activeSection) return null;
    const section = sections[activeSection as keyof typeof sections];
    return (
      <div className="section">
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <p>
          <strong>Tiempo restante:</strong> {formatTime(timeLeft)}
        </p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Mapa</h1>
      <div className="buttons">
        <button onClick={() => handleSectionClick("section1")}>Zona Norte</button>
        <button onClick={() => handleSectionClick("section2")}>Centro Histórico</button>
        <button onClick={() => handleSectionClick("section3")}>Zona Industrial</button>
      </div>
      {renderSection()}

      {/* Esperar a tener ubicación antes de mostrar el mapa */}
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
            <>
              <Marker position={userPosition}>
                <Popup>Tu ubicación actual</Popup>
              </Marker>
            </>
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
        </MapContainer>
      )}

      <div className="postsContainer">
        <h2 className="postsTitle">Posts</h2>
        <ul className="postList">
          {posts.map((p) => (
            <li key={p.id} className="postItem">
              <strong>{p.title}</strong>: {p.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
