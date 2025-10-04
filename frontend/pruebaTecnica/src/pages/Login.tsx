import React, { useState } from "react";
import { login } from "../api/authorization/authService";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  rol: number;
  idUsuario:number;
  exp:number
  
}

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(correo, password);
      const token = response.token;
      const decoded = jwtDecode<JwtPayload>(token);

      localStorage.setItem("token", token);
      localStorage.setItem("correo", decoded.sub);
      localStorage.setItem("rol", String(decoded.rol));

      if (decoded.rol === 1) {
        
       
        window.location.href = "/inventarioAdmin";
      } else {
       
        window.location.href = "/inventario";
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo + título */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-12 h-12 text-blue-500"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 
                00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 
                4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Iniciar sesión en tu cuenta
          </h2>
          <span className="text-sm text-gray-600">
            o{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              registra una nueva cuenta
            </a>
          </span>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">
              Correo
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className="appearance-none block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="appearance-none block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm text-center py-2 px-3 rounded">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;





