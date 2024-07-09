import { useAutenticado } from "./authContext";
import { Navigate } from "react-router-dom";

export function Protected({ children }) {
  const { user } = useAutenticado();

  if (user) return <Navigate to="/home" />;

  return <>{children}</>;
}
