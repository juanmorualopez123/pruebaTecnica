
const API_URL = import.meta.env.VITE_API_URL;
export const entradaProducto = async (id: number, cantidad: number) => {
  const response = await fetch(`${API_URL}inventario/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cantidad }),
  });

  if (!response.ok) {
    throw new Error("Error al registrar entrada de producto");
  }

  return response.json();
};
