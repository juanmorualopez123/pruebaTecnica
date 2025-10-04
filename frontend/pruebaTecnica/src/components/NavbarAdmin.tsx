import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md p-4 flex justify-between items-center z-50">
      
      <div className="text-white font-bold text-lg tracking-wide">
        Panel Admin
      </div>

      
      <div className="flex gap-6">
        <Link
          to="/inventarioAdmin"
          className="text-gray-300 hover:text-white transition"
        >
          Inventario Admin
        </Link>
        <Link
          to="/historico"
          className="text-gray-300 hover:text-white transition"
        >
          Histórico
        </Link>
      </div>

      
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("correo");
          localStorage.removeItem("rol");
          window.location.href = "/";
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 active:bg-red-800 transition"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default NavbarAdmin;
