import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, DefaultLayout } from "../layouts";
import { Dashboard, Home, Login, Signup } from "../pages";
import PublicRoute from "./PublicRoute";
import ProtectRoute from "./ProtectRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public with restricted routes */}
        <Route element={<PublicRoute restricted />}>
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        {/* Public  routes */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
