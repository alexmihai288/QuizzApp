"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishQuizzModal } from "@/hooks/use-finish-quizz";
import { formatTimer } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FinishModalProps {
  authorOfProject: {
    username: string;
    image: string | null | undefined;
  };
  timer: number;
  totalQuestions: number;
  correctQuestions: number;
}

export const FinishModal: FC<FinishModalProps> = ({
  authorOfProject,
  timer,
  totalQuestions,
  correctQuestions,
}) => {
  const finishModal = useFinishQuizzModal();
  const percentage = Math.round((correctQuestions / totalQuestions) * 100);

  return (
    <Dialog open={finishModal.isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Statistics</DialogTitle>
          <DialogDescription className="pt-5">
            Your score: {percentage}% <br />
            Your finished time: {formatTimer(timer)}
            <br />
            Correct answers: {correctQuestions}
            <br />
            Incorrect answers: {totalQuestions - correctQuestions}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-10">
          <p className="font-semibold">Author:</p>
          <div className="flex items-center gap-2">
            <Image
              src={authorOfProject.image ?? "/questionMark.png"}
              width={30}
              height={30}
              alt="user-image"
              className="rounded-full"
            />
            <p className="text-sm">{authorOfProject.username}</p>
          </div>
        </div>
        <DialogFooter>
          <Link
            className={buttonVariants()}
            href="/quizzes"
            onClick={finishModal.onClose}
          >
            Explore more
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
