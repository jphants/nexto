import React, { useState } from 'react';
import styles from './login.module.css';

interface LoginFormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({ email: '', password: '' });
  const [userType, setUserType] = useState<'common' | 'owner'>('common');
  const [formSide, setFormSide] = useState<'left' | 'right'>('left');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log(`Datos de login (${userType}):`, formData);
    alert(`Login intentado (${userType === 'common' ? 'Usuario Común' : 'Dueño de Tienda'}): ${JSON.stringify(formData)}`);
  };

  const toggleFormSide = (side: 'left' | 'right') => {
    setFormSide(side);
    setUserType(side === 'left' ? 'common' : 'owner');
  };

  return (
    <div className={userType === 'common' ? styles.containerLight : styles.containerDark}>
      <div className={styles.splitContainer}>
        {/* Fondo dividido en dos secciones */}
        <div className={styles.backgroundSections}>
          <div
            className={`${styles.section} ${styles.descriptionSection}`}
            onClick={() => toggleFormSide('left')}
          >
            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>Usuario Común</h2>
              <p className={styles.descriptionText}>
                Inicia sesión como usuario común para explorar y disfrutar de las funcionalidades de la plataforma.
              </p>
            </div>
          </div>
          <div
            className={`${styles.section} ${styles.descriptionSection}`}
            onClick={() => toggleFormSide('right')}
          >
            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>Dueño de Tienda</h2>
              <p className={styles.descriptionText}>
                Inicia sesión como dueño de tienda para gestionar tu negocio y acceder a herramientas administrativas.
              </p>
            </div>
          </div>
        </div>

        {/* Formulario que se mueve */}
        <div
          className={`${styles.formWrapper} ${
            formSide === 'left' ? styles.formLeft : styles.formRight
          } ${userType === 'common' ? styles.formLight : styles.formDark}`}
        >
          <h2 className={userType === 'common' ? styles.titleLight : styles.titleDark}>
            Iniciar Sesión
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
    </div>
  );
};

export default Login;