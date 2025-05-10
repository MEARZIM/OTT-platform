// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../session/auth-context";


export default function ProtectedRoute() {
  const { user, loading } = useUser();

  if (loading) return null; // or a loading spinner

  return user ? <Outlet /> : <Navigate to="/" />;
}
