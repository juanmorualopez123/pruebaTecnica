import React, { useEffect, useState } from "react";
import { getInventario } from "../api/inventario/inventarioService";
import AgregarProducto from "../components/AgregarProducto";
import  EstatusProducto  from "../components/EstatusProducto";
import EntradaProducto from "../components/EntradaProducto";
import { updateProducto } from "../api/inventario/updateProducto";
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

const InventarioAdmin = () => {
  const [productos, setProductos] = useState<Inventario[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarFormEntrada, setMostrarFormEntrada] = useState(false);
  const [mostrarFormEstatus, setMostrarFormEstatus] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Inventario | null>(null);
  

  

  const handleGuardarProducto = (nuevoProducto: Inventario) => {
    setProductos([...productos, { ...nuevoProducto, idProducto: productos.length + 1 }]);
    
        
  };

  const handleUpdateProducto = async (cantidad: number) => {
  if (!productoSeleccionado) return;
  const cantidadAntesSuma=cantidad;
 cantidad=productoSeleccionado.cantidad+cantidad;
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
      cantidad: cantidadAntesSuma ,
      movimiento: 1, // 1 = entrada
      fecha: new Date().toISOString()
    };

    await createHistorial(historial);




    setMostrarFormEntrada(false);
     Swal.fire({
      title: "¡Éxito!",
      text: `Se agregó ${cantidadAntesSuma} unidades al inventario de ${productoActualizado.nombre}`,
      icon: "success",
      confirmButtonColor: "#2563eb", 
    });
    
    setProductoSeleccionado(null);

  } catch (error) {
    console.log(error);
    //alert("Error al actualizar inventario:  "+error);
          Swal.fire({
                
                text: `Error al actualizar inventario`,
                icon: "error",
                confirmButtonColor: "#eb2525ff", 
              });
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
        getInventario()
        .then(data => setProductos(data))
        .catch(err => console.error(err));
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-700"> Inventario</h1>
          <button onClick={()=>setMostrarForm(true)}className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Agregar Producto
          </button>
          {mostrarForm&&(

            <AgregarProducto
              onClose={()=>setMostrarForm(false)}
              onSave={(handleGuardarProducto)}
            />
          )

          }

        </div>

        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left hidden">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Estatus</th>
              <th className="px-4 py-2 text-center">Acciones</th>
              <th className="px-4 py-2 text-center"></th>
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
                  
                  <button 
                  onClick={()=>{setMostrarFormEntrada(true);setProductoSeleccionado(prod);}}     className="w-28 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 transition">
                    Entrada
                  </button>
                  {mostrarFormEntrada && productoSeleccionado && (
                    <EntradaProducto
                      producto={productoSeleccionado}          
                      onClose={() => setMostrarFormEntrada(false)}
                      onSave={handleUpdateProducto}         
                    />
                  )}
                  </td>
                  <td className="px-4 py-2 text-center ">
                  {prod.estatus === 1 ? (
                    <button onClick={()=>{setProductoSeleccionado(prod);setMostrarFormEstatus(true);}}       className="w-28 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 active:bg-red-800 transition">
                      Baja
                    </button>
                    
                  
                  ) : (
                    <button onClick={()=>{setProductoSeleccionado(prod);setMostrarFormEstatus(true);}}       className="w-28 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 active:bg-green-800 transition">
                      Activar
                    </button>
                  )}
                  
                </td>
              </tr>
            ))}
           {mostrarFormEstatus && productoSeleccionado && (
              <EstatusProducto
                onClose={() => {
                  setMostrarFormEstatus(false);
                  setProductoSeleccionado(null);
                }}
                onSave={handleEstatusProducto}
                estatusActual={productoSeleccionado.estatus}
                nombreProducto={productoSeleccionado.nombre}
                idProducto={productoSeleccionado.idProducto!}
              />
            )}

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

export default InventarioAdmin;
