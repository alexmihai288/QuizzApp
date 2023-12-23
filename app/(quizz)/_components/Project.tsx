"use client";
import { Button } from "@/components/ui/button";
import { identificator } from "@/constants";
import { useFinishQuizzModal } from "@/hooks/use-finish-quizz";
import {  ProjectwQuestionwAnswerWithUser } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FinishModal } from "../../../components/modals/FinishModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ProjectProps {
  project: ProjectwQuestionwAnswerWithUser;
}

export const Project = ({ project }: ProjectProps) => {
  const allQuestions = project.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Initialize with the index of the first question
  const currentQuestion = allQuestions[currentQuestionIndex];

  const [correctQuestions, setCorrectQuestions] = useState(0);

  let delayTimeout: NodeJS.Timeout;
  const finishQuizzModal = useFinishQuizzModal();

  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTimer = () => {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    };

    if (timerRunning) {
      startTimer();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const { data } = await axios.post("/api/update-status", { projectId });

      return data;
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onChooseAnswer = (questionIndex: number, answerIndex: number) => {
    const isSelectedAnswerCorrect =
      allQuestions[questionIndex].answers[answerIndex].isCorrect;

    if (isSelectedAnswerCorrect) {
      toast.success("Your answer is correct !");
      setCorrectQuestions((prevState) => prevState + 1);
    } else toast.error("Your answer is NOT correct.");

    clearTimeout(delayTimeout);

    delayTimeout = setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        toast.dismiss();
        setCurrentQuestionIndex((prevState) => prevState + 1);
      } else {
        toast.dismiss();
        setTimerRunning(false);
        toast.success("You finished the quizz");
        finishQuizzModal.onOpen();
        //update status

        updateStatus({ projectId: project.id });
      }
    }, 1000);
  };

  return (
    <div className="container">
      <div className="border-2 border-mainLightBlue p-2 rounded-sm flex-1">
        <div className="bg-white p-2 rounded-sm">
          <h1 className="text-2xl font-bold text-center break-words">
            {project?.title}
          </h1>
          <p className="text-muted-foreground text-center text-sm mt-2.5 break-words">
            Topic: {project?.topic}
          </p>

          <div className="mt-10 flex flex-col md:flex-row md:items-center gap-2.5">
            <p className="whitespace-nowrap font-bold text-xl underline underline-offset-8 decoration-mainLightBlue">
              Question{" "}
              <span className="font-normal">{currentQuestionIndex + 1}:</span>
            </p>
            <p className="overflow-hidden break-words">
              {currentQuestion.questionText}
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-evenly">
            {currentQuestion.answers.map((answer, answerIndex) => (
              <Button
                key={answer.id}
                variant="normal"
                onClick={() =>
                  onChooseAnswer(currentQuestionIndex, answerIndex)
                }
                className="w-fit max-w-full whitespace-normal overflow-auto"
              >
                {identificator[answerIndex]} {answer.answerText}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <FinishModal
        authorOfProject={{
          username: project.user.username,
          image: project.user.image,
        }}
        timer={timer}
        totalQuestions={project.questions.length}
        correctQuestions={correctQuestions}
      />
    </div>
  );
};
