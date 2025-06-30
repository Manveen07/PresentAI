import { create } from "zustand";
import { OutlineCard } from "@/lib/types";
import { persist, devtools } from "zustand/middleware";

type page = "create" | "creative-ai" | "create-scratch";
type Prompt = {
  id: string;
  createdAt: string;
  title: string;
  outlines: OutlineCard[];
};
type PropmptStore = {
  page: page;
  setPage: (page: page) => void;
  prompts: Prompt[] | [];
  addPrompts: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
};

const usePromptStore = create<PropmptStore>()(
  persist(
    (set) => ({
      page: "create",
      setPage: (page) => {
        set({ page });
      },
      prompts: [],
      addPrompts: (prompt: Prompt) => {
        set((state) => ({
          prompts: [prompt, ...state.prompts],
        }));
      },
      removePrompt: (id: string) => {
        set((state) => ({
          prompts: state.prompts.filter((prompt: Prompt) => prompt.id !== id),
        }));
      },
    }),
    { name: "prompts" }
  )
);

export default usePromptStore;
