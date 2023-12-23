"use client";
import { FC, useState } from "react";
import { CreateProjectHeader } from "./CreateProjectHeader";
import { CreateProjectBody } from "./CreateProjectBody";
import { CreateQuestion, ProjectwQuestionwAnswer, UpdateQuestion } from "@/types";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { revalidatePathUrl } from "@/lib/revalidate";

interface CreateProjectFormsProps {
  projectToBeEdited?: ProjectwQuestionwAnswer | null;
}

export const CreateProjectForms: FC<CreateProjectFormsProps> = ({
  projectToBeEdited,
}) => {
  const [title, setTitle] = useState<string>(projectToBeEdited?.title ?? "");
  const [topic, setTopic] = useState<string>(projectToBeEdited?.topic ?? "");

  const [questionsToBeCreated, setQuestionsToBeCreated] = useState<
   CreateQuestion[]
>(projectToBeEdited?.questions ?? []);

  const router = useRouter();
  const { mutate: createProject, isPending } = useMutation({
    mutationFn: async (questions: CreateQuestion[]) => {
      if (title.trim() === "" && topic.trim() === "")
        throw new Error("Title and topic must have a non-empty text");

      if (
        !questions.every(
          (q) =>
            q.questionText.trim() !== "" &&
            q.answers.every((a) => a.answerText.trim() !== "")
        ) ||
        questions.length === 0
      ) {
        throw new Error("All questions and answers must have non-empty text.");
      }

      if (!questions.every((q) => q.answers.length >= 2))
        throw new Error("Each question must have at least 2 answers.");

      if (!questions.every((q) => q.answers.some((a) => a.isCorrect === true)))
        throw new Error("Each question must have one correct answer.");

      const { data } = await axios.post("/api/createProject", {
        title,
        topic,
        questions,
      });

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      revalidatePathUrl("/dashboard");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: editProject, isPending: isEditing } = useMutation({
    mutationFn: async (questions: UpdateQuestion[]) => {
      if (title.trim() === "" && topic.trim() === "")
        throw new Error("Title and topic must have a non-empty text");

      if (
        !questions.every(
          (q) =>
            q.questionText.trim() !== "" &&
            q.answers.every((a) => a.answerText.trim() !== "")
        ) ||
        questions.length === 0
      ) {
        throw new Error("All questions and answers must have non-empty text.");
      }

      if (!questions.every((q) => q.answers.length >= 2))
        throw new Error("Each question must have at least 2 answers.");

      if (!questions.every((q) => q.answers.some((a) => a.isCorrect === true)))
        throw new Error("Each question must have one correct answer.");

      const { data } = await axios.post("/api/editProject", {
        projectId: projectToBeEdited?.id,
        title,
        topic,
        questions,
      });

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      revalidatePathUrl("/dashboard");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  return (
    <form className="space-y-20">
      <CreateProjectHeader
        setTitle={setTitle}
        title={title}
        setTopic={setTopic}
        topic={topic}
      />
      <CreateProjectBody
        editMode={!!projectToBeEdited?.id}
        questionsToBeCreated={questionsToBeCreated}
        setQuestionsToBeCreated={setQuestionsToBeCreated}
        createProject={createProject as () => Promise<void>}
        editProject={editProject as () => Promise<void>}
        isPending={isPending}
        isEditing={isEditing}
      />
    </form>
  );
};
