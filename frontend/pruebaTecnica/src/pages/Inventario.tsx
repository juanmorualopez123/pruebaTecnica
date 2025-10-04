import React, { useEffect, useState } from "react";
import { getInventario } from "../api/inventario/inventarioService";

import { updateProducto } from "../api/inventario/updateProducto";
import SalidaProducto from "../components/SalidaProducto";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { createHistorial, getUsuarioById } from "../api/historial/createHistorial";


type Inventario = {
  idProducto?: number;
  nombre: string;
  cantidad: number;
  estatus: number;
};

interface JwtPayload {
  sub: string;
  rol: number;
  idUsuario:number;
}

type Historial={
    idHistorial?:number,
    idUsuario:number,
    idProducto:number,
    cantidad:number,
    movimiento:number,
    fecha:Date
}

const Inventario = () => {
  const [productos, setProductos] = useState<Inventario[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarFormEntrada, setMostrarFormSalida] = useState(false);
  const [mostrarFormEstatus, setMostrarFormEstatus] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Inventario | null>(null);
  const [error, setError] = useState("");

  

  

  const handleSalidaProducto = async (cantidad: number) => {
  if (!productoSeleccionado) return;
  const cantidadAntesResta=cantidad;
 cantidad=productoSeleccionado.cantidad-cantidad;
  try {
    
    const productoActualizado = await updateProducto(productoSeleccionado.idProducto!, {cantidad});

    
    setProductos(productos.map(p =>
      p.idProducto === productoActualizado.idProducto ? productoActualizado : p
    ));

    const token=localStorage.getItem("token");
     
        if (!token) {
          console.error("No hay token en localStorage");
          return;
        }
        if (!productoSeleccionado.idProducto) {
          console.error("El producto no tiene ID");
          return;
        }
    
        
        const decoded = jwtDecode<JwtPayload>(token);
    
        const usuario = await getUsuarioById(decoded.idUsuario);
          
        const historial = {
          usuario:{idUsuario:usuario.idUsuario},
          producto:{idProducto:productoSeleccionado.idProducto},
          cantidad: cantidadAntesResta ,
          movimiento: 2, //2  = salida
          fecha: new Date().toISOString()
        };
    
        await createHistorial(historial);

    
    setMostrarFormSalida(false);
         Swal.fire({
          title: "¡Éxito!",
          text: `Se retiraron ${cantidadAntesResta} unidades al inventario de ${productoActualizado.nombre}`,
          icon: "success",
          confirmButtonColor: "#2563eb", // azul
        });
        
    setProductoSeleccionado(null);
  } catch (error) {
    
    console.error("Error al actualizar cantidad:", error);
  }
};


   const handleEstatusProducto = (productoActualizado: Inventario) => {
  setProductos(productos.map(p =>
    p.idProducto === productoActualizado.idProducto
      ? productoActualizado
      : p
  ));

  setMostrarFormEstatus(false);
  setProductoSeleccionado(null);

  console.log("token: "+localStorage.getItem("correo"));
};

  



    useEffect(() => {
        localStorage.getItem("correo");
        localStorage.getItem("rol");
        getInventario()
        .then(data => setProductos(data))
        .catch(err => console.error(err));
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-700"> Salida de inventario</h1>
          

        </div>

        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left hidden">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Estatus</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.idProducto} className="border-b bg-gray-25 hover:bg-gray-50">
                <td className="px-4 py-2 text-left text-black hidden">{prod.idProducto}</td>
                <td className="px-4 py-2 text-left text-black">{prod.nombre}</td>
                <td className="px-4 py-2 text-left text-black">{prod.cantidad}</td>
                <td className="px-4 py-2 text-left">
                  {prod.estatus === 1 ? (
                    <span className="text-green-600 font-medium">Activo</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactivo</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                 
                  
                 
                    <button onClick={()=>{setProductoSeleccionado(prod);setMostrarFormSalida(true)}}  className="w-28 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 active:bg-red-800 transition">
                      Salida
                    </button>
                    {mostrarFormEntrada && productoSeleccionado && (
                    <SalidaProducto
                      producto={productoSeleccionado}         
                      onClose={() => setMostrarFormSalida(false)}
                      onSave={handleSalidaProducto}           
                    />
                  )}
                  
                  
                </td>
              </tr>
            ))}
           

            {productos.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-4 italic"
                >
                  No hay productos en inventario
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;
