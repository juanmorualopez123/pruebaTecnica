package com.pruebatecnica.almacen;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pruebatecnica.almacen.model.Historial;
import com.pruebatecnica.almacen.model.Inventario;
import com.pruebatecnica.almacen.model.Usuarios;

public interface HistorialRepository extends JpaRepository<Historial,Integer>{
    Historial findByUsuario(Usuarios idUsuario);
    Historial findByProducto(Inventario idProducto);
    
} 
