package com.pruebatecnica.almacen;

import org.springframework.data.jpa.repository.JpaRepository;


import com.pruebatecnica.almacen.model.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Integer>{
    
    
}
