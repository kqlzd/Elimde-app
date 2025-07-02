import React from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../../../pages/components/Loading/Loading";
import { useAdminAuth } from "../../../hooks/useAdmin";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
