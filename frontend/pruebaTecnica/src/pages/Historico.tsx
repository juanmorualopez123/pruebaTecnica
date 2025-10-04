import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

type Historial = {
  idMovimiento: number;
  movimiento: number; // 1: entrada, 2: salida
  cantidad: number;
  usuario: Usuario;
  producto: Producto;
  fecha: string; 
};
type Usuario ={
  idUsuario:number;
  correo:string;
  estatus:number;
  nombre:string;

}

type Producto ={
  idProducto:number;
  nombre:string;
  cantidad:number;
  estatus:number;
}

const Historico = () => {
  const [registros, setRegistros] = useState<Historial[]>([]);
    const [filtroMovimiento, setFiltroMovimiento] = useState<number | "">( "" ); 


  useEffect(() => {
  
    fetch(`${API_URL}/historial`)
      .then((res) => res.json())
      .then((data) => setRegistros(data))
      .catch((err) => console.error(err));


     
  }, []);

  const getMovimientoTexto = (mov: number) => {
    switch (mov) {
      case 1:
        return "Entrada";
      case 2:
        return "Salida";
     
      default:
        return "Desconocido";
    }
  };
  
  const registrosFiltrados = filtroMovimiento
    ? registros.filter((r) => r.movimiento === filtroMovimiento)
    : registros;


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Histórico</h1>
        <div className="mb-4">
          <label className="mr-2 font-medium text-gray-700">Filtrar por movimiento:</label>
          <select
            className="border rounded p-2"
            value={filtroMovimiento}
            onChange={(e) => setFiltroMovimiento(e.target.value ? Number(e.target.value) : "")}
          >
            <option value="">Todos</option>
            <option value="1">Entrada</option>
            <option value="2">Salida</option>
            
          </select>
        </div>
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left hidden">ID</th>
              <th className="px-4 py-2 text-left">Movimiento</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((r) => (
              <tr key={r.idMovimiento} className="border-b bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 hidden">{r.idMovimiento}</td>
                <td className="px-4 py-2 text-left">{getMovimientoTexto(r.movimiento)}</td>
                <td className="px-4 py-2 text-left">{r.cantidad}</td>
                <td className="px-4 py-2 text-left">{r.usuario.nombre}</td>
                <td className="px-4 py-2 text-left">{r.producto.nombre}</td>
                <td className="px-4 py-2 text-left">{new Date(r.fecha).toLocaleString()}</td>
              </tr>
            ))}
            {registrosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4 italic">
                  No hay registros para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historico;
