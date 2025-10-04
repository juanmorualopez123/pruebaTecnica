package com.pruebatecnica.almacen.model;

// DTO para Producto
public class ProductoDTO {
    private int idProducto;
    private String nombre;

    public ProductoDTO(int idProducto, String nombre) {
        this.idProducto = idProducto;
        this.nombre = nombre;
    }

    // Getters y setters
    public int getIdProducto() { return idProducto; }
    public void setIdProducto(int idProducto) { this.idProducto = idProducto; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}

