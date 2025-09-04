import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axiosInstance from "../api/axiosInstance";
import { isAxiosError } from "axios";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<unknown | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = (await axiosInstance.get("/customers/me")).data;
        if (response.success) {
          setUser(response.data);
          setAuthenticated(true);
        }
      } catch (err) {
        if (isAxiosError(err)) {
          console.log(err?.response?.data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
        <span className="loading cursor-not-allowed sm:loading-xl loading-spinner"></span>
      </div>
    );
  }

  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
