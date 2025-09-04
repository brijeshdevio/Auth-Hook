import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context";
import Router from "./router";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <Router />
        </QueryClientProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
