import React from 'react'

const API_URL = import.meta.env.VITE_API_URL;
type Historial={
    idHistorial?:number,
    usuario:{idUsuario:number},
    producto:{idProducto:number},
    cantidad:number,
    movimiento:number,
    fecha:string
}
export const createHistorial = async (historial:Historial) => {
    
  try{
    const res = await fetch(`${API_URL}/historial`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
     body: JSON.stringify(
    
    historial
  ),
});
if (!res.ok) {
      throw new Error(`Error al crear historial: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }

 
};

export type Usuarios = {
  idUsuario: number;
  nombre: string;
  

  
};

export const getUsuarioById = async (idUsuario: number): Promise<Usuarios> => {
    try{
  const res = await fetch(`${API_URL}/usuarios/${idUsuario}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
    const data= await res.json();
    
    return data;
   
  } catch (error) {
    console.error(error);
    throw error;
  }
};