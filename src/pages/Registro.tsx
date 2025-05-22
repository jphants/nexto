import React, { useState } from 'react';
import './estiloRegistro.css'

const Registro = () => {
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    // Aquí puedes continuar con el envío (ej: fetch o axios)
    console.log({ tipo, nombre, email, password });
  };

  return (
    <div className="registro-container">
  <div className="registro-box">
    <h2 className="registro-title">Regístrate</h2>

    <form onSubmit={handleSubmit} className="registro-form">
      {/* Tipo de cuenta con botones */}
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
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div>
        <label>Correo electrónico</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div>
        <label>Confirmar contraseña</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>

      {error && <p className="registro-error">{error}</p>}

      <div>
        <button type="submit" className="registro-button">Registrarse</button>
      </div>
    </form>

    <p className="registro-footer">
      ¿Ya tienes una cuenta?
      <a href="/login" className="registro-link">Inicia sesión</a>
    </p>
  </div>
</div>

  );
};

export default Registro;
