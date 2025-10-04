package com.pruebatecnica.almacen.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;

@Entity
@Table(name = "historial", schema="dbo")
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMovimiento")
    private Integer idMovimiento;

    @Column(name = "movimiento", nullable = false)
    private Integer movimiento;

    @Column(name = "cantidad")
    private Integer cantidad;

   @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName="idUsuario")
    
    private Usuarios usuario;

    @ManyToOne
    @JoinColumn(name = "idProducto", referencedColumnName = "idProducto", nullable = false)
    
    private Inventario producto;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;


    public Historial() {}

    
    public Historial(Integer idMovimiento, Integer movimiento,Integer cantidad, Usuarios usuario, Inventario producto, LocalDateTime fecha) {
        this.idMovimiento = idMovimiento;
        this.movimiento = movimiento;
        this.cantidad = cantidad;
        this.usuario = usuario;
        this.producto = producto;
        this.fecha = fecha;
    }



    public Integer getIdMovimiento() {
    return idMovimiento;
    }

    public void setIdMovimiento(Integer idMovimiento) {
        this.idMovimiento = idMovimiento;
    }

    public Integer getMovimiento() {
        return movimiento;
    }

    public void setMovimiento(Integer movimiento) {
        this.movimiento = movimiento;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Inventario getProducto() {
        return producto;
    }

    public void setProducto(Inventario producto) {
        this.producto = producto;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }


    @Override
    public String toString() {
        return "Historial{" +
                "idMovimiento=" + idMovimiento +
                ", movimiento=" + movimiento +
                ", usuario=" + (usuario != null ? usuario.getIdUsuario() : null) +
                ", producto=" + (producto != null ? producto.getIdProducto() : null) +
                ", fecha=" + fecha +
                '}';
    }

}
