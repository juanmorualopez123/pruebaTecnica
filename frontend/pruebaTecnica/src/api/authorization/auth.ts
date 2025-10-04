import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  rol: number;
  idUsuario: number;
  exp?: number; 
}

export function getDecodedToken(): JwtPayload | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded;
  } catch {
    
    localStorage.removeItem("token");
    return null;
  }
}

export function getUserRole(): number | null {
  const decoded = getDecodedToken();
  return decoded ? decoded.rol : null;
}

export function isAuthenticated(): boolean {
  return !!getDecodedToken();
}
