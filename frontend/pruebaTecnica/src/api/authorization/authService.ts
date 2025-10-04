import React from 'react'

const API_URL = import.meta.env.VITE_API_URL;


export const login = async (correo: string, contrasena: string) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
};