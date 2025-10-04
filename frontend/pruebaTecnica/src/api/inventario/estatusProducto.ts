import type { Inventario } from "../../modelo/Inventario";


const API_URL = import.meta.env.VITE_API_URL;



export const estatusProducto = async (id: number,nuevoEstatus: number) => {
  const response = await fetch(`${API_URL}/inventario/baja/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({estatus:nuevoEstatus}),
  });

  if (!response.ok) {
    throw new Error("error al activar o desactivar producto");
  }

  return response.json();
};
