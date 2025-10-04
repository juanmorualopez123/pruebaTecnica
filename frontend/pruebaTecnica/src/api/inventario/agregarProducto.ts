import type { Inventario } from "../../modelo/Inventario";


const API_URL = import.meta.env.VITE_API_URL;

export const agregarProducto = async (producto: Inventario) => {
  const response = await fetch(`${API_URL}/inventario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return response.json();
};
