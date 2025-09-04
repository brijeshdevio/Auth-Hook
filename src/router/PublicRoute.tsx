import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";

const PublicRoute = ({ restricted = false }: { restricted: boolean }) => {
  const { authenticated } = useAuth();

  return authenticated && restricted ? (
    <Navigate to={"/dashboard"} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
