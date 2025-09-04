import { Link } from "react-router-dom";

const Home = () => {
  return (
    <header className="h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-[500px] flex flex-col gap-2 text-center">
        <h1 className="text-2xl sm:text-4xl font-mozilla">
          Authentication, Simplified
        </h1>
        <h2 className="text-lg opacity-70">
          Powerful, multi-tenant API authentication—so developers can focus on
          building features, not login flows.
        </h2>
        <p className="text-sm opacity-70">
          <strong>AuthHook API</strong> – your plug-and-play gateway to secure,
          scalable auth.
        </p>

        <div className="mt-2">
          <Link to="/login" className="btn btn-primary">
            Get Started for Free
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Home;
