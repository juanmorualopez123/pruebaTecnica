import { useState } from "react";
import type { Inventario } from "../modelo/Inventario";
import { agregarProducto } from "../api/inventario/agregarProducto";
import Swal from "sweetalert2";

interface AgregarProductoProps {
  onClose: () => void;
  onSave: (nuevoProducto: Inventario) => void;
}

const AgregarProducto = ({ onClose, onSave }: AgregarProductoProps) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);

  const handleSubmit = async () => {
  try {
    const nuevoProducto = { nombre, cantidad, estatus: 1 };
    const productoCreado = await agregarProducto(nuevoProducto);
     Swal.fire({
                title: "¡Éxito!",
                text: `Se agregó correctamente el prducto ${productoCreado.nombre}`,
                icon: "success",
                timer:1500,
                confirmButtonColor: "#2563eb", 
              })
    onSave(productoCreado); 
    onClose();
    
    
  } catch (error) {
    console.error("Error al crear el producto:", error);
    Swal.fire({
                
                text: `Error al crear el producto`,
                icon: "error",
                timer: 1500,
                confirmButtonColor: "#eb2525ff", 
              });
    
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="text-black border p-2 w-full mb-2 rounded"
            required
          />
          
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2  bg-gray-300 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
