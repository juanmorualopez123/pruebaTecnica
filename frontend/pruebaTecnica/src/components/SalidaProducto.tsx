import { useState } from "react";
import type { Inventario } from "../modelo/Inventario";
import { updateProducto } from "../api/inventario/updateProducto";

interface SalidaProductoProps {
  producto: Inventario;
  onClose: () => void;
  onSave: (cantidad: number) => void;
}

const SalidaProducto = ({ producto, onClose, onSave }: SalidaProductoProps) => {
  const [cantidad, setCantidad] = useState(0);
const [error, setError] = useState("");
  const handleSubmit = () => {
     if (cantidad <= 0) {
      setError("Advertencia : cantidad ingresada no valida, no puede ser cero o negativa");
      return; 
    }

    if (!Number.isInteger(cantidad)) {
    setError("Advertencia: la cantidad ingresada debe ser un número entero");
    return;
    }
    if (cantidad>producto.cantidad) {
      setError("Advertencia : cantidad ingresada no valida, no puede superar la cantidad de existencias");
      return; 
    }
    
    onSave(cantidad);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl text-black font-bold mb-4">Salida de {producto.nombre}</h2>

        {error && (
          <div className="mb-2 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          placeholder="Cantidad"
          className="text-black border p-2 w-full mb-4 rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2  bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white  rounded hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalidaProducto;