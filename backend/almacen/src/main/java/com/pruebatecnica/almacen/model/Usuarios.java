package com.pruebatecnica.almacen.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

@Entity
@Table(name="usuarios")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idUsuario")

public class Usuarios {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idUsuario")
    private Integer idUsuario;

    @Column(name="nombre", length = 100)
    private String nombre;

    @Column(name="correo", length = 50)
    private String correo;
    
    @Column(name="contrasena", length = 25)
    private String contrasena;
    
    
    
    
    
    @ManyToOne
    @JoinColumn(name="idRol", referencedColumnName = "idRol",nullable = false)
    @JsonBackReference
    private Roles idRol;
    
    @Column(name="estatus")
    private Integer estatus;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private List<Historial> movimientos;

    
    public Usuarios() {}

    
    public Usuarios(Integer idUsuario, String nombre, String correo, String contrasena, Roles idRol, Integer estatus,List<Historial> movimientos)  {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.idRol = idRol;
        this.estatus = estatus;
        this.movimientos=movimientos;
    }



    
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public Roles getRol() {
        return idRol;
    }

    public void setRol(Roles idRol) {
        this.idRol = idRol;
    }

    public Integer getEstatus() {
        return estatus;
    }

    public void setEstatus(Integer estatus) {
        this.estatus = estatus;
    }

    @Override
    public String toString() {
        return "Usuarios{" +
                "idUsuario=" + idUsuario +
                ", nombre='" + nombre + '\'' +
                ", correo='" + correo + '\'' +
                ", contrasena='" + contrasena + '\'' +
                ", rol=" + (idRol != null ? idRol.getIdRol() : null) +
                ", estatus=" + estatus +
                '}';
    }
    
}
