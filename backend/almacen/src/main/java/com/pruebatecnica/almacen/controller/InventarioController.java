package com.pruebatecnica.almacen.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pruebatecnica.almacen.InventarioRepository;
import com.pruebatecnica.almacen.RolRepository;
import com.pruebatecnica.almacen.model.Inventario;
import com.pruebatecnica.almacen.model.Usuarios;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;




@CrossOrigin(origins="*")
@RestController
@RequestMapping("/inventario")
public class InventarioController {

    private final RolRepository rolRepository;
    
    @Autowired
    private InventarioRepository inventarioRepository;


    InventarioController(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }
    
    
    @GetMapping
    public ResponseEntity<List<Inventario>> getAllInventario() {
        List<Inventario> inventarios = inventarioRepository.findAll();
        return ResponseEntity.ok(inventarios); // 200
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Inventario> getInventarioById(@PathVariable Integer id) {
        Optional <Inventario> inventarioData=inventarioRepository.findById(id);
        
        if(inventarioData.isPresent()){
            return new ResponseEntity<>(inventarioData.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Inventario> updateInventario(@PathVariable Integer id, @RequestBody Inventario inventario) {
        Optional<Inventario> inventarioData=inventarioRepository.findById(id);

        if(inventarioData.isPresent()){
            Inventario inventarioExistente=inventarioData.get();
            inventarioExistente.setCantidad(inventario.getCantidad());
            

            Inventario actualizado=inventarioRepository.save(inventarioExistente);
            return ResponseEntity.ok(actualizado);
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }   

    @PutMapping("baja/{id}")
    public ResponseEntity<Inventario> bajaInventario(@PathVariable Integer id, @RequestBody Inventario inventario) {
        Optional<Inventario> inventarioData=inventarioRepository.findById(id);

        if(inventarioData.isPresent()){
            Inventario inventarioExistente=inventarioData.get();
            inventarioExistente.setEstatus(inventario.getEstatus());
            

            Inventario actualizado=inventarioRepository.save(inventarioExistente);
            return ResponseEntity.ok(actualizado);
        }else{
            return ResponseEntity.notFound().build();
        }
        
    } 

   @PostMapping
    public ResponseEntity<Inventario> createInventario(@RequestBody Inventario inventario) {
       
        
        return ResponseEntity.status(HttpStatus.CREATED).body(inventarioRepository.save(inventario));

    } 


    
    
    
}
