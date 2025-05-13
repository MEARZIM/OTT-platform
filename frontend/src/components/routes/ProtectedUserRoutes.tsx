// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/use-user";



export default function ProtectedRoute() {
  const { user, loading } = useUser();

  if (loading) return null; // or a loading spinner

  return user ? <Outlet /> : <Navigate to="/" />;
}
