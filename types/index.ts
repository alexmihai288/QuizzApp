import { Question, Answer, Project } from "@prisma/client";

export type CreateQuestion = Omit<Question, "id" | "projectId"> & {
  answers: Omit<Answer, "id" | "questionId">[];
};

export type ProjectwQuestionId = Project & {
  questions: { id: string }[];
};

export type ProjectwQuestionwAnswer = Project & {
  questions: {
    id: string;
    questionText: string;
    projectId: string;
    answers: Answer[];
  }[];
  user: {
    username: string;
    image: string | null | undefined;
  };
};
