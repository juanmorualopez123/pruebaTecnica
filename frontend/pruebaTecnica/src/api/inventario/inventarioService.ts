

const API_URL = import.meta.env.VITE_API_URL;
export const getInventario = async () => {
  const response = await fetch(`${API_URL}/inventario`);
  if (!response.ok) {
    throw new Error("Error al obtener inventario");
  }
  return response.json();
};
