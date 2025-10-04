package com.pruebatecnica.almacen.model;

// DTO para Historial
import java.time.LocalDateTime;

public class HistorialDTO {
    private int idMovimiento;
    private int movimiento; // "Entrada" o "Salida"
    private int cantidad;
    private UsuarioDTO usuario;
    private ProductoDTO producto;
    private LocalDateTime fecha;

    public HistorialDTO(int idMovimiento, int movimiento, int cantidad,
                        UsuarioDTO usuario, ProductoDTO producto, LocalDateTime fecha) {
        this.idMovimiento = idMovimiento;
        this.movimiento = movimiento;
        this.cantidad = cantidad;
        this.usuario = usuario;
        this.producto = producto;
        this.fecha = fecha;
    }

    // Getters y setters
    public int getIdMovimiento() { return idMovimiento; }
    public void setIdMovimiento(int idMovimiento) { this.idMovimiento = idMovimiento; }

    public int getMovimiento() { return movimiento; }
    public void setMovimiento(int movimiento) { this.movimiento = movimiento; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public UsuarioDTO getUsuario() { return usuario; }
    public void setUsuario(UsuarioDTO usuario) { this.usuario = usuario; }

    public ProductoDTO getProducto() { return producto; }
    public void setProducto(ProductoDTO producto) { this.producto = producto; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}
