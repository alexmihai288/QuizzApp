"use client";
import { InputWrapper } from "@/app/(auth)/_components/InputWrapper";
import { Button } from "@/components/ui/button";
import { CreateQuestion } from "@/types";
import { Check } from "lucide-react";
import { FC, useState } from "react";

interface CreateProjectBodyProps {
  questionsToBeCreated: CreateQuestion[];
  setQuestionsToBeCreated: React.Dispatch<
    React.SetStateAction<CreateQuestion[]>
  >;
  createProject: (questions: CreateQuestion[]) => Promise<void>;
  isPending: boolean;
}

export const CreateProjectBody: FC<CreateProjectBodyProps> = ({
  questionsToBeCreated,
  setQuestionsToBeCreated,
  createProject,
  isPending,
}) => {
  const handleAddQuestion = (e: any) => {
    e.preventDefault();
    const newQuestion: CreateQuestion = {
      questionText: "", // Get this value from your InputWrapper
      answers: [
        {
          answerText: "",
          isCorrect: false,
        },
      ],
    };

    setQuestionsToBeCreated((prev) => [...prev, newQuestion]);
  };

  const handleAddAnswer = (questionIndex: number) => {
    const newAnswer = {
      answerText: "",
      isCorrect: false,
    };

    const updatedQuestions = [...questionsToBeCreated];
    updatedQuestions[questionIndex].answers.push(newAnswer);
    setQuestionsToBeCreated(updatedQuestions);
  };

  const addQuestionText = (e: any, questionIndex: number) => {
    const updatedQuestions = [...questionsToBeCreated];
    updatedQuestions[questionIndex].questionText = e.target.value;
    setQuestionsToBeCreated(updatedQuestions);
  };

  const addAnswerText = (
    e: any,
    questionIndex: number,
    answerIndex: number
  ) => {
    const updatedQuestions = [...questionsToBeCreated];
    updatedQuestions[questionIndex].answers[answerIndex].answerText =
      e.target.value;
    setQuestionsToBeCreated(updatedQuestions);
  };

  const handleMarkAsCorrect = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questionsToBeCreated];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = true;
    setQuestionsToBeCreated(updatedQuestions);
  };

  const shouldShowMarkAsCorrect = (questionIndex: number): boolean => {
    return questionsToBeCreated[questionIndex].answers.every(
      (answer) => !answer.isCorrect
    );
  };

  const remainingAnswersCount = (questionIndex: number): number => {
    const maxAnswersPerQuestion = 4;
    const currentAnswersCount =
      questionsToBeCreated[questionIndex].answers.length;
    return Math.max(0, maxAnswersPerQuestion - currentAnswersCount);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-white mb-5 underline underline-offset-8 decoration-mainLightBlue">
        Create-Project | Body
      </h1>

      <div className="space-y-24">
        {questionsToBeCreated.map((questionToBeCreated, questionIndex) => (
          <div key={questionIndex} className="createQuestionModel">
            <div className="question">
              <label className="font-bold text-white text-lg">
                Add a question
              </label>
              <InputWrapper
                value={questionToBeCreated.questionText}
                type="text"
                className="max-w-4xl"
                onChange={(e) => addQuestionText(e, questionIndex)}
              />
            </div>

            <div className="answers mt-5">
              <label className="font-bold text-white text-lg">
                Answers:{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  ( {remainingAnswersCount(questionIndex)} answers remaining )
                </span>
              </label>
              <div className="space-y-2.5">
                {questionToBeCreated.answers.map((answer, answerIndex) => {
                  if (questionToBeCreated.answers.length - 1 === answerIndex)
                    return (
                      <div
                        key={answerIndex}
                        className="flex items-center justify-between"
                      >
                        <div className="flex flex-col md:flex md:items-center w-full gap-2.5">
                          <InputWrapper
                            value={answer.answerText}
                            key={answerIndex}
                            type="text"
                            className="max-w-xl"
                            onChange={(e) =>
                              addAnswerText(e, questionIndex, answerIndex)
                            }
                          />
                          <div className="flex items-center gap-2.5">
                            {shouldShowMarkAsCorrect(questionIndex) && (
                              <Button
                                variant="normalOutline"
                                onClick={() =>
                                  handleMarkAsCorrect(
                                    questionIndex,
                                    answerIndex
                                  )
                                }
                              >
                                <Check className="text-green-600" /> Mark as
                                correct
                              </Button>
                            )}
                            <Button
                              variant="normalOutline"
                              onClick={() => handleAddAnswer(questionIndex)}
                              disabled={
                                remainingAnswersCount(questionIndex) === 0
                              }
                            >
                              Add new answer
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  return (
                    <InputWrapper
                      value={answer.answerText}
                      key={answerIndex}
                      type="text"
                      className="max-w-xl"
                      onChange={(e) =>
                        addAnswerText(e, questionIndex, answerIndex)
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <Button variant={"normalOutline"} onClick={handleAddQuestion}>
            Add a new question
          </Button>
          <Button
            variant={"normal"}
            onClick={() => createProject(questionsToBeCreated)}
            isLoading={isPending}
            type="button"
          >
            Create project
          </Button>
        </div>
      </div>
    </div>
  );
};
