package com.pruebatecnica.almacen.controller;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pruebatecnica.almacen.HistorialRepository;
import com.pruebatecnica.almacen.InventarioRepository;
import com.pruebatecnica.almacen.UsuarioRepository;
import com.pruebatecnica.almacen.model.Historial;
import com.pruebatecnica.almacen.model.HistorialDTO;
import com.pruebatecnica.almacen.model.ProductoDTO;
import com.pruebatecnica.almacen.model.UsuarioDTO;
import com.pruebatecnica.almacen.model.Usuarios;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@CrossOrigin(origins="*")
@RestController
@RequestMapping("/historial")
public class HistorialController {
    

    @Autowired
    private HistorialRepository historialRepository;

    @GetMapping
    public ResponseEntity<List<HistorialDTO>> getAllHistorial() {
        List<HistorialDTO>historiales=obtenerHistorial();
        return ResponseEntity.ok(historiales);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Historial> getHistorialById(@PathVariable Integer id) {
        Optional <Historial> historialData=historialRepository.findById(id);

        if (historialData.isPresent()){
            return new ResponseEntity<>(historialData.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        
    }

    @PostMapping
    public ResponseEntity createHistorial(@RequestBody Historial historial) {
        
        if (historial.getUsuario().getIdUsuario() == null || historial.getProducto().getIdProducto() == null) {
        
        return ResponseEntity.badRequest().build();
        }
       

         if (historial.getFecha() != null) {
     
        historial.setFecha(LocalDateTime.now());
        }
        return  ResponseEntity.status(HttpStatus.CREATED).body(historialRepository.save(historial));
    }
    
    
    public List<HistorialDTO> obtenerHistorial() {
    List<Historial> historial = historialRepository.findAll();

    return historial.stream().map(h -> new HistorialDTO(
            h.getIdMovimiento(),
            h.getMovimiento(),
            h.getCantidad(),
            new UsuarioDTO(
                    h.getUsuario().getIdUsuario(),
                    h.getUsuario().getNombre(),
                    h.getUsuario().getCorreo(),
                    h.getUsuario().getRol().getNombre()
            ),
            new ProductoDTO(
                    h.getProducto().getIdProducto(),
                    h.getProducto().getNombre()
            ),
            h.getFecha()
    )).toList();
}

    
   
    
}
