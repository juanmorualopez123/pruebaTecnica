package com.pruebatecnica.almacen.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pruebatecnica.almacen.RolRepository;
import com.pruebatecnica.almacen.model.Roles;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins="*")
@RestController
@RequestMapping("/rol")
public class RolController {

    
    
    @Autowired
    private RolRepository rolRepository;

    @GetMapping
    public ResponseEntity<List<Roles>> getAllRoles() {
        List<Roles> roles= rolRepository.findAll();
        return ResponseEntity.ok(roles);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Roles> getRolById(@PathVariable Integer id) {
        Optional <Roles> rolData=rolRepository.findById(id);
        if(rolData.isPresent()){
            return new ResponseEntity<>(rolData.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        
    }
    
   
    

}
