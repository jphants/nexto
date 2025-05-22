import React, { useState } from 'react';
import styles from './login.module.css';

interface LoginFormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({ email: '', password: '' });
  const [userType, setUserType] = useState<'common' | 'owner'>('common'); // Estado para tipo de usuario

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log(`Datos de login (${userType}):`, formData);
    alert(`Login intentado (${userType === 'common' ? 'Usuario Común' : 'Dueño de Tienda'}): ${JSON.stringify(formData)}`);
  };

  return (
    <div className={userType === 'common' ? styles.containerLight : styles.containerDark}>
      <div className={styles.userTypeSelector}>
        <button
          onClick={() => setUserType('common')}
          className={userType === 'common' ? styles.activeButton : styles.inactiveButton}
        >
          Usuario Común
        </button>
        <button
          onClick={() => setUserType('owner')}
          className={userType === 'owner' ? styles.activeButton : styles.inactiveButton}
        >
          Dueño de Tienda
        </button>
      </div>
      <div className={userType === 'common' ? styles.cardLight : styles.cardDark}>
        <h2 className={userType === 'common' ? styles.titleLight : styles.titleDark}>
          {userType === 'common' ? 'Bienvenido' : 'Panel de Tienda'}
        </h2>
        <div className="mb-5">
          <label className={userType === 'common' ? styles.labelLight : styles.labelDark} htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={userType === 'common' ? styles.inputLight : styles.inputDark}
            placeholder="tu@correo.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className={userType === 'common' ? styles.labelLight : styles.labelDark} htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={userType === 'common' ? styles.inputLight : styles.inputDark}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="flex justify-end mb-6">
          <a href="#" className={userType === 'common' ? styles.linkLight : styles.linkDark}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          onClick={handleLogin}
          className={userType === 'common' ? styles.buttonLight : styles.buttonDark}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Login;