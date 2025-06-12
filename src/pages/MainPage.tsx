import React from 'react';
import Map from '../components/map'; // Asegúrate de que coincida con el nombre y ruta del archivo
import "./MainPage.css"
import "../components/header.css"; // Importa el CSS del header si es necesario
import "../components/map.css"; // Importa el CSS del mapa si es necesario

const MainPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Map />
    </div>
  );
};

export default MainPage;
