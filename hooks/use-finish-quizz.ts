import { create } from "zustand";

type finishQuizzModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useFinishQuizzModal = create<finishQuizzModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
