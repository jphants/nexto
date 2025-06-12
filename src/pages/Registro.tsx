import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './estiloRegistro.css';

const Registro = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dni, setDni] = useState('');
  const [ruc, setRuc] = useState('');
  const [location, setLocation] = useState('');
  const [ubicacionEstado, setUbicacionEstado] = useState('');
  const [error, setError] = useState('');

  const obtenerDireccion = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`
      );
      const data = await res.json();
      return data.display_name || `${lat}, ${lon}`;
    } catch (err) {
      console.error('Error obteniendo dirección:', err);
      return `${lat}, ${lon}`;
    }
  };

  useEffect(() => {
    if (tipo === 'negocio') {
      setUbicacionEstado('Obteniendo ubicación...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const direccion = await obtenerDireccion(lat, lon);
          setLocation(direccion);
          setUbicacionEstado('Ubicación obtenida');
        },
        (err) => {
          setUbicacionEstado('No se pudo obtener la ubicación');
          console.error('Error de geolocalización:', err);
        }
      );
    } else {
      setLocation('');
      setUbicacionEstado('');
    }
  }, [tipo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!tipo) {
    setError('Debes seleccionar un tipo de cuenta');
    return;
  }

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }

  if (tipo === 'usuario' && !dni) {
    setError('El DNI es obligatorio');
    return;
  }

  if (tipo === 'negocio' && (!ruc || !location)) {
    setError('El RUC y la ubicación son obligatorios');
    return;
  }

  setError('');

  // Armar el body de la solicitud según tipo de cuenta
  const body =
    tipo === 'usuario'
      ? { name: nombre, dni, email, password }
      : { name: nombre, dni: null, email, password, ruc, location };

  try {
    const response = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Error al registrar');
      return;
    }

    // Registro exitoso, redirigir o mostrar mensaje
    console.log('Registro exitoso:', data);
    navigate('/main'); // o a donde quieras
  } catch (error) {
    setError('Error de conexión con el servidor');
    console.error(error);
  }
};

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2 className="registro-title">Regístrate</h2>

        <form onSubmit={handleSubmit} className="registro-form">
          <div>
            <label className="labelLight">Tipo de cuenta</label>
            <div className="tipoCuentaToggle">
              <button
                type="button"
                className={`toggleBtn ${tipo === 'usuario' ? 'active' : ''}`}
                onClick={() => setTipo('usuario')}
              >
                Usuario común
              </button>
              <button
                type="button"
                className={`toggleBtn ${tipo === 'negocio' ? 'active' : ''}`}
                onClick={() => setTipo('negocio')}
              >
                Negocio
              </button>
            </div>
          </div>

          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {tipo === 'usuario' && (
            <div>
              <label>DNI</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>
          )}

          {tipo === 'negocio' && (
            <>
              <div>
                <label>RUC</label>
                <input
                  type="text"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Ubicación</label>
                <input
                  type="text"
                  value={location}
                  readOnly
                  placeholder="Esperando ubicación..."
                />
                <small>{ubicacionEstado}</small>
              </div>
            </>
          )}

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="registro-error">{error}</p>}

          <div>
            <button type="submit" className="registro-button">Registrarse</button>
          </div>
        </form>

        <p className="registro-footer">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="registro-link">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
