import { create } from "zustand";

type ProModalStore = {
  isOpen: boolean;
  onClick: () => void;
};

export const useShowPassword = create<ProModalStore>((set) => ({
  isOpen: false,
  onClick: () => set((prev) => ({ isOpen: !prev.isOpen })),
}));
