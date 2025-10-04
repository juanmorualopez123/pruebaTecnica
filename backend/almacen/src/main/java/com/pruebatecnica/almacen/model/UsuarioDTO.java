package com.pruebatecnica.almacen.model;
// DTO para Usuario
public class UsuarioDTO {
    private int idUsuario;
    private String nombre;
    private String correo;
    private String rol; // solo el nombre del rol

    // Constructor
    public UsuarioDTO(int idUsuario, String nombre, String correo, String rol) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.rol = rol;
    }

    // Getters y setters
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
