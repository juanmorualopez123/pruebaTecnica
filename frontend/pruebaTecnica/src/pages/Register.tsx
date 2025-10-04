import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
type UsuarioNuevo = {
  nombre: string;
  correo: string;
  contrasena: string;
  rol: number;
};

export default function Register() {
  const [formData, setFormData] = useState<UsuarioNuevo>({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: 2, // 1=admin, 2=usuario
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMensaje("");

  try {
    
    const body = {
      nombre: formData.nombre,
      correo: formData.correo,
      contrasena: formData.contrasena,
      rol: { idRol: Number(formData.rol) },
      estatus:1
    };

    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    setMensaje("Usuario registrado exitosamente");
    setFormData({ nombre: "", correo: "", contrasena: "", rol: 2 });
  } catch (error) {
    console.error(error);
    setMensaje("Error al registrar el usuario");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registrar nueva cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Almacenista</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
        )}

        <div className="text-center mt-4">
          <a
            href="/"
            className="text-blue-500 text-sm hover:underline"
          >
            Volver al inicio de sesión
          </a>
        </div>
      </div>
    </div>
  );
}
