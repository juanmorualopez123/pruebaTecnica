package com.pruebatecnica.almacen.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pruebatecnica.almacen.JwtUtil;
import com.pruebatecnica.almacen.UsuarioRepository;
import com.pruebatecnica.almacen.model.Inventario;
import com.pruebatecnica.almacen.model.Usuarios;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;



@CrossOrigin(origins="*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Usuarios>> getAllUsuarios() {
        List<Usuarios> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok(usuarios);  
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> getUsuarioById(@PathVariable Integer id) {
        Optional <Usuarios> usuarioData=usuarioRepository.findById(id);

        if(usuarioData.isPresent()){
            return new ResponseEntity<>(usuarioData.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    

    @PutMapping("/{id}")
    public ResponseEntity<Usuarios> updateUsuario(@PathVariable Integer id, @RequestBody Usuarios usuario) {
        Optional<Usuarios> usuarioData=usuarioRepository.findById(id);

        if(usuarioData.isPresent()){
            Usuarios usuarioExistente=usuarioData.get();
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setCorreo(usuario.getCorreo());
            usuarioExistente.setContrasena(usuario.getContrasena());
            usuarioExistente.setEstatus(usuario.getEstatus());
            usuarioExistente.setRol(usuario.getRol());

            Usuarios actualizado=usuarioRepository.save(usuarioExistente);
            return ResponseEntity.ok(actualizado);
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }   
    
    @PostMapping
    public ResponseEntity<Usuarios> createUsuario(@RequestBody Usuarios usuario) {
       
        
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuario));

    }

    @PostMapping("/login")
    public ResponseEntity<?>login(@RequestBody Map<String,String> credentials) {
        String correo = credentials.get("correo");
        String contrasena= credentials.get("contrasena");
        

        Optional<Usuarios> usuarioOpt = usuarioRepository.findByCorreo(correo);

        
        if (usuarioOpt.isPresent()) {
        Usuarios usuario = usuarioOpt.get();
        if (usuario.getContrasena().equals(contrasena)) {
            String token = JwtUtil.generateToken(usuario.getCorreo(), usuario.getRol().getRol(),usuario.getIdUsuario());
            return ResponseEntity.ok(Map.of("token", token));
        }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
}


    
    
    

}
