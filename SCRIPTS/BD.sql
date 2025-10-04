create database pruebaTecnica;
use pruebaTecnica;


create table roles(
	idRol int identity (1,1) primary key,
	rol int,--1 administrador, 2 almacenista
	nombre varchar (25),
	estatus int --1 activo, 0 inactivo
);


insert into roles (rol,nombre,estatus) values (1,'administrador',1);
insert into roles (rol,nombre,estatus) values (2,'almacenista',1);

create table usuarios(
	idUsuario INT IDENTITY (1,1) PRIMARY KEY,
	nombre VARCHAR(100),
	correo VARCHAR(100) unique,
	contrasena VARCHAR(25),
	idRol INT foreign key References roles(idRol),
	estatus INT, --1 activo, 0 inactivo
	
);


create table inventario(
	idProducto int identity(1,1) primary key,
	nombre varchar(100),
	cantidad int,
	estatus int,--1 activo, 0 baja

);




create table historial(
	idMovimiento int identity(1,1) primary key,
	movimiento int,--1 entrada, 2 salida,3 nuevoProducto
	cantidad int,
	idUsuario int references usuarios(idUsuario),
	idProducto int references inventario(idProducto),
	fecha DateTime
);