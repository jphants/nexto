import React, { useState } from 'react';

interface LoginFormState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    // Lógica para manejar el login, por ejemplo, enviar datos a una API
    console.log('Datos de login:', formData);
    alert('Login intentado con: ' + JSON.stringify(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Bienvenido</h2>
        <div className="mb-5">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            placeholder="tu@correo.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="flex justify-end mb-6">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition duration-200">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPage;