import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useUser } from "../providers/UserProvider";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return null;

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
