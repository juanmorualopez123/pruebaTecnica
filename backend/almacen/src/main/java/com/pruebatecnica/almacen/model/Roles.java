package com.pruebatecnica.almacen.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "roles")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idRol")

public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRol")
    private Integer idRol;

    @Column(name = "nombre", length = 25)
    private String nombre;

    @Column(name = "rol")
    private Integer rol;

    @Column(name = "estatus")
    private Integer estatus;

    @OneToMany(mappedBy = "idRol")
    @JsonManagedReference
    private List<Usuarios> usuarios;


    
    public Roles() {}

    
    public Roles(Integer idRol, Integer rol, Integer estatus, List<Usuarios> usuarios) {
        this.idRol = idRol;
        this.rol = rol;
        this.estatus = estatus;
        this.usuarios = usuarios;
    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getRol() {
        return rol;
    }

    public void setRol(Integer rol) {
        this.rol = rol;
    }

    public Integer getEstatus() {
        return estatus;
    }

    public void setEstatus(Integer estatus) {
        this.estatus = estatus;
    }

    public List<Usuarios> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuarios> usuarios) {
        this.usuarios = usuarios;
    }

    
    @Override
    public String toString() {
        return "Roles{" +
                "idRol=" + idRol +
                ", rol='" + rol + '\'' +
                ", estatus=" + estatus +
                '}';
    }

}
