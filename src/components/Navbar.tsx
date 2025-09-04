import { TbApiApp } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const Navbar = () => {
  const { authenticated } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await axiosInstance.post("/customers/logout"),
    mutationKey: ["customer_logout"],
    onSuccess: () => {
      location.reload();
    },
    onError: (err: unknown) => {
      if (isAxiosError(err)) {
        const msg =
          err.response?.data?.error?.message ||
          err.response?.statusText ||
          "Something went wrong";
        toast.error(msg);
      }
    },
  });

  return (
    <nav className="w-full px-3 sm:px-10 py-3">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-1 text-lg font-mozilla font-black"
        >
          <TbApiApp size={40} className="text-primary" />
          <span>AuthHook</span>
        </Link>
        <div className="flex items-center gap-2">
          {authenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
                }
              >
                Dashboard
              </NavLink>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                disabled={isPending}
                onClick={() => mutate()}
              >
                {isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-sm btn-ghost">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
