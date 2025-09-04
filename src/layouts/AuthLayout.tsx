import { Link, Outlet } from "react-router-dom";
import { TbApiApp } from "react-icons/tb";
import { Footer } from "../components";

const AuthLayout = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full">
        <div className="p-4">
          <Link
            to="/"
            className="flex items-center gap-1 text-lg font-mozilla font-black"
          >
            <TbApiApp size={40} className="text-primary" />
            <span>AuthHook</span>
          </Link>
        </div>
      </nav>
      <main className="w-full h-screen flex items-center justify-center p-2 bg-gradient-to-br from-neutral to-primary">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
