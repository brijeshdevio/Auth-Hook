import { createContext } from "react";

interface ContextType {
  user: null | unknown;
  setUser: React.Dispatch<unknown>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  user: null,
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<ContextType>(initialState);

export default AuthContext;
