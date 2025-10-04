export interface Inventario {
  idProducto?: number; 
  nombre: string;
  cantidad: number;
  estatus: number; // 1 = activo, 0 = inactivo
}
