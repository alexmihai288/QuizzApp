"use client";
import { revalidatePathUrl } from "@/lib/revalidate";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface DeleteProjectProps {
  projectId: string;
}

export const DeleteProject: FC<DeleteProjectProps> = ({ projectId }) => {
  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.post("/api/delete-project", { id });

      return data;
    },
    onSuccess: (data) => {
      toast.success(`Project ${data} has been deleted !`);
      revalidatePathUrl("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return isPending ? (
    <Loader2 className="text-muted-foreground h-5 animate-spin" />
  ) : (
    <Trash
      className="text-red-600 h-5 cursor-pointer"
      onClick={() => deleteProject(projectId)}
    />
  );
};
