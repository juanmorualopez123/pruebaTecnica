import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized= () => {
  const navigate = useNavigate();

  const handleBack = () => {
    
    navigate(-1);
  };

  const handleLogin = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("correo");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <svg
          className="mx-auto mb-4 w-16 h-16 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1112 3a9 9 0 019 9z" />
        </svg>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Acceso no autorizado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permiso para ver este recurso. Si crees que esto es un error, inicia sesión con una cuenta que tenga
          los permisos adecuados.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Volver
          </button>

          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Ir a Iniciar Sesión
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Si necesitas acceso, contacta al administrador del sistema.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
