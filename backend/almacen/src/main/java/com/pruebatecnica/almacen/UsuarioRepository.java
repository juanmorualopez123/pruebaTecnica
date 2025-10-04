package com.pruebatecnica.almacen;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pruebatecnica.almacen.model.Usuarios;

public interface UsuarioRepository extends JpaRepository<Usuarios, Integer>{
    
        Optional<Usuarios> findByCorreo(String correo);

}
