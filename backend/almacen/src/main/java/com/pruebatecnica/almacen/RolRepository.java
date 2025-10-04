package com.pruebatecnica.almacen;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pruebatecnica.almacen.model.Roles;

public interface RolRepository extends JpaRepository<Roles, Integer>{
    Roles findByRol(Integer rol);
    
}
