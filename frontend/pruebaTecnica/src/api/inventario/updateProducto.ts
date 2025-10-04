import type { Inventario } from "../../modelo/Inventario";

const API_URL = import.meta.env.VITE_API_URL;



export const updateProducto = async (id: number, data: { cantidad: number }): Promise<Inventario> => {
  const response = await fetch(`${API_URL}/inventario/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la cantidad");
  }

  return response.json();
};
