import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const NewKeyModal = ({ onSuccess = () => {} }: { onSuccess: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (request: unknown) =>
      await axiosInstance.post("/keys", request),
    mutationKey: ["create_key"],
    onSuccess: () => {
      toast("Key created successfully");
      onSuccess();
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

  const formik = useFormik({
    initialValues: {
      name: "",
      websiteUrl: "",
    },
    onSubmit: (values) => {
      mutate(values);
      formik.handleReset(values);
    },
  });

  return (
    <>
      <button
        className="btn btn-sm btn-primary"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as unknown as {
              showModal: () => void;
            }
          ).showModal()
        }
      >
        Create New API Key
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-100">
          <form method="dialog" className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Create New API Key</h3>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2">
              ✕
            </button>
          </form>

          <form
            className="mt-4 flex flex-col gap-2"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="API Key Name"
              required
              onChange={formik.handleChange}
            />
            <input
              type="url"
              name="websiteUrl"
              className="input w-full"
              placeholder="Website URL"
              required
              onChange={formik.handleChange}
            />
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary w-full"
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default NewKeyModal;
