import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../api/authorization/auth";


interface Props {
  children: React.ReactNode;
  allowedRoles?: number[]; 
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const auth = isAuthenticated();
  const role = getUserRole();

  if (!auth) {
    // Si no hay token válido
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    // Si tiene token pero no el rol
    return <Navigate to="/unauthorized" replace />;
  }

  // Autorizado
  return <>{children}</>;
};

export default ProtectedRoute;
