# pruebaTecnica
IDE: VScode
Lenguaje: Java 17 ,typescript 5.9.3
DBMS: Microsoft SQL Server Developer (64-bit) 16.0.1000.6


Pasos para correr aplicación
Para el /backend

* En ../SCRIPTS
  correr script para la creación de la base de datos
*En target\classes\application.properties
  -verificar el puerto de la cadena de conexión con la bd y el nombre
  introducir sus credenciales en username y password para que pueda acceder a la BD
Inicie el proyecto desde la terminal
  mvn spring-boot:run
   Backend corriendo en: http://localhost:8080



En el frontend
  verificar en .env que el host del proyecto backend es correcto
  de no ser asi cambiar el puerto 
  ejecutar: npm install para instalar dependencias
  ejecutar npm run dev
  app corriendo en http://localhost:5173
  
