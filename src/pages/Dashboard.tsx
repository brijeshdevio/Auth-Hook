import { useMutation } from "@tanstack/react-query";
import { LuTrash2 } from "react-icons/lu";
import axiosInstance from "../api/axiosInstance";
import { timeAgo } from "../utils";
import { IoCopy, IoSearchOutline } from "react-icons/io5";
import type { KeyType } from "../types";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { isAxiosError } from "axios";
import { NewKeyModal } from "../components";

const Dashboard = () => {
  const { data, mutate } = useMutation({
    mutationFn: async () => (await axiosInstance.get("/keys")).data,
    mutationKey: ["keys"],
  });

  const deleteMutate = useMutation({
    mutationFn: async (id: string) =>
      (await axiosInstance.delete(`/keys/${id}`)).data,
    mutationKey: ["delete_key"],
    onSuccess: () => {
      toast.success("Key deleted successfully!");
      mutate();
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

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-mozilla font-bold">API Keys</h2>
            <p className="text-sm">Manage your secret keys for API access.</p>
          </div>
          <NewKeyModal onSuccess={() => mutate()} />
        </div>
      </section>
      <section>
        <div className="overflow-x-auto">
          {data?.data?.length == 0 || !data?.data ? (
            <div className="text-center py-5">
              <div className="flex items-center justify-center gap-2 opacity-70">
                <IoSearchOutline size={20} />
                <span className="text-sm">Not found Keys</span>
              </div>
            </div>
          ) : (
            <table className="table table-pin-rows table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Website URL</th>
                  <th>Last Used</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((key: KeyType["data"]) => (
                  <tr key={key.id} className="group">
                    <td className="w-60">
                      <span className="line-clamp-1 overflow-hidden">
                        {key.name}
                      </span>
                    </td>
                    <td className="flex items-center gap-2">
                      <div className="w-28">
                        <span className="line-clamp-1 overflow-hidden">
                          {key.websiteUrl}
                        </span>
                      </div>
                      <button
                        className="btn btn-sm btn-ghost btn-circle"
                        onClick={() => {
                          navigator.clipboard.writeText(key.key as string);
                          toast.success(`'${key.key}' copy to clipboard!`);
                        }}
                      >
                        <IoCopy />
                      </button>
                    </td>
                    <td>{timeAgo(key.updatedAt)}</td>
                    <td>{key.isActive ? "Active" : "Inactive"}</td>
                    <td className="flex items-center gap-2">
                      <button
                        className="btn btn-sm btn-ghost btn-circle text-error"
                        onClick={() => deleteMutate.mutate(key.id)}
                        disabled={deleteMutate.isPending}
                      >
                        {deleteMutate.isPending ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <LuTrash2 size={14} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
