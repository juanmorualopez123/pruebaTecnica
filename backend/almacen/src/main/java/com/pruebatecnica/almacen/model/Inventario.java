package com.pruebatecnica.almacen.model;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "inventario")
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducto")
    private Integer idProducto;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "estatus", nullable = false)
    private Integer estatus;

    @OneToMany(mappedBy = "producto")
    @JsonIgnore
    private List<Historial> movimientos;

    public Inventario() {}

    
    public Inventario(Integer idProducto, String nombre, Integer cantidad, Integer estatus, List<Historial> movimientos) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.estatus = estatus;
        this.movimientos= movimientos;
    }

    public Integer getIdProducto() {
    return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getEstatus() {
        return estatus;
    }

    public void setEstatus(Integer estatus) {
        this.estatus = estatus;
    }

    public List<Historial> getMovimientos() {
        return movimientos;
    }

    public void setMovimientos(List<Historial> movimientos) {
        this.movimientos = movimientos;
    }

    @Override
    public String toString() {
        return "Inventario{" +
                "idProducto=" + idProducto +
                ", nombre='" + nombre + '\'' +
                ", cantidad=" + cantidad +
                ", estatus=" + estatus +
                '}';
    }
   
}
