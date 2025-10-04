
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import InventarioAdmin from "./pages/InventarioAdmin";
import Inventario from './pages/Inventario';
import Historico from './pages/Historico';
import { useEffect, useState } from 'react';
import NavbarAdmin from './components/NavbarAdmin';
import NavbarAlmacenista from './components/NavbarAlmacenista';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/unauthorized';
import Register from './pages/Register';

function App() {
  const [correo,setCorreo]=useState("");
  const [rol,setRol]=useState("");

  useEffect(()=>{
    setCorreo(""+localStorage.getItem("correo"));
    setRol(""+localStorage.getItem("rol"));
  })

  return (
    <>
   
   <BrowserRouter>
      {rol === "1" && <NavbarAdmin />}
      {rol === "2" && <NavbarAlmacenista />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inventarioAdmin" element={
                      <ProtectedRoute allowedRoles={[1]}>
                        <InventarioAdmin />
                      </ProtectedRoute>} />
        <Route path="/inventario" element={
                      <ProtectedRoute allowedRoles={[2]}>
                        <Inventario />
                      </ProtectedRoute>} />
                      
        <Route path="/historico" element={
                      <ProtectedRoute allowedRoles={[1]}>
                        <Historico />
                      </ProtectedRoute>} />

        <Route path="/unauthorized" element={
                      <Unauthorized/>}/>

        <Route path="/register"element={
        <Register/>
      }/>
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
