import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full p-3 md:w-[80%] mx-auto flex flex-col gap-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
