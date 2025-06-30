import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreateAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutline: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
  resetOutlines: () => void;
};
const useCreateAIStore = create<CreateAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      currentAiPrompt: "",
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      addMultipleOutline: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      setCurrentAiPrompt: (prompt: string) => {
        set(() => ({
          currentAiPrompt: prompt,
        }));
      },
      resetOutlines: () => {
        set({ outlines: [] });
      },
    }),
    { name: "creative-ai" }
  )
);

export default useCreateAIStore;
