import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";

const ProtectRoute = () => {
  const { authenticated, user } = useAuth();

  return authenticated && user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default ProtectRoute;
