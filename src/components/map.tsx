import React, { useState, useEffect } from "react";

const Map = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const sections = {
    section1: {
      title: "Zona Norte",
      description: "Área residencial con parques y escuelas.",
      duration: 600, // 10 minutos
    },
    section2: {
      title: "Centro Histórico",
      description: "Zona turística con muchos restaurantes.",
      duration: 1500, // 25 minutos
    },
    section3: {
      title: "Zona Industrial",
      description: "Área de fábricas y almacenes.",
      duration: 300, // 5 minutos
    },
  };

  // Formatear segundos a mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Manejar selección de sección y contador
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

  // Limpiar contador al desmontar componente
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const renderSection = () => {
    if (!activeSection) return null;
    const section = sections[activeSection as keyof typeof sections];
    return (
      <div style={styles.section}>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <p>
          <strong>Tiempo restante:</strong> {formatTime(timeLeft)}
        </p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1>Mapa</h1>
      <div style={styles.buttons}>
        <button onClick={() => handleSectionClick("section1")}>Zona Norte</button>
        <button onClick={() => handleSectionClick("section2")}>Centro Histórico</button>
        <button onClick={() => handleSectionClick("section3")}>Zona Industrial</button>
      </div>
      {renderSection()}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  section: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "rgb(0, 0, 0)",
  },
};

export default Map;
