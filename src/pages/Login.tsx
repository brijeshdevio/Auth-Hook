import { Link } from "react-router-dom";
import { FormCard } from "../components";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useFormik } from "formik";

const Login = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (request: unknown) =>
      (await axiosInstance.post("/customers/login", request)).data,
    mutationKey: ["login"],
    onSuccess: () => location.reload(),
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <FormCard>
      <FormCard.Header>
        <h2 className="text-3xl font-mozilla font-bold">Good see you again</h2>
        <p className="text-base opacity-70">Sign in to your dashboard</p>
      </FormCard.Header>
      <FormCard.Body>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="email"
            className="input w-full"
            placeholder="shine@example.com"
            required
            onChange={formik.handleChange}
          />
          <input
            type="password"
            name="password"
            className="input w-full"
            placeholder="password"
            required
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </FormCard.Body>
      <FormCard.Footer>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>
      </FormCard.Footer>
    </FormCard>
  );
};

export default Login;
