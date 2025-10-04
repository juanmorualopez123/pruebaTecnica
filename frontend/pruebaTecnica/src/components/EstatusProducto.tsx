import React from "react";
import { estatusProducto } from "../api/inventario/estatusProducto";
import type { Inventario } from "../modelo/Inventario";
import Swal from "sweetalert2";

interface EstatusProductoProps {
  onClose: () => void;
  onSave: (productoActualizado: Inventario) => void;
  estatusActual: number;
  nombreProducto: string;
  idProducto: number;
}

const EstatusProducto = ({ onClose, onSave, estatusActual, nombreProducto, idProducto }: EstatusProductoProps) => {
  const handleConfirmar = async () => {
    try {
      const nuevoEstatus = estatusActual === 1 ? 0 : 1;
      const productoActualizado = await estatusProducto(idProducto, nuevoEstatus);
      onSave(productoActualizado); 
      onClose();
      Swal.fire({
            title: "¡Éxito!",
            text: `Se cambió el estatus del prducto ${productoActualizado.nombre} a ${nuevoEstatus===1?"activo":"baja"}`,
            icon: "success",
            confirmButtonColor: "#2563eb", // azul
          });
      
    } catch (error) {
      console.error(error);
      
      Swal.fire({
            
            text: `Error al actualizar estatus`,
            icon: "error",
            confirmButtonColor: "#eb2525ff", 
          });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Confirmar acción</h2>
        <p className="mb-6 text-black">
          ¿Seguro que deseas {estatusActual === 1 ? "dar de baja" : "activar"} el producto{" "}
          <span className="font-semibold">{nombreProducto}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2  bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="px-4 py-2 bg-blue-600 text-white  rounded hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstatusProducto;
