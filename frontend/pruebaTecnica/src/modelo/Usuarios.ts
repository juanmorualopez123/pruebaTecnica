export interface Usuarios {
  idUsuario?: number;
  nombre: string;
  correo: string;
  contrasena: string;
  estatus: number;
  idRol: Rol;
}

export interface Rol {
  idRol: number;
  rol: string;
  estatus: number;
}
