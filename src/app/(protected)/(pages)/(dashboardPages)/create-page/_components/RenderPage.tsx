"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatePage from "./createPage/CreatePage";
import usePrompStore from "@/store/usePrompStore";
import CreateAI from "./GenerativeAI/CreativeAI";
import ScratchPage from "./Scratch/ScratchPage";

function RenderPage() {
  const router = useRouter();
  const { page, setPage } = usePrompStore();

  const handelBack = () => {
    setPage("create");
  };

  const handelSelcectOption = (option: string) => {
    if (option === "template") {
      router.push("/templates");
    } else if (option === "create-scratch") {
      setPage("create-scratch");
    } else {
      setPage("creative-ai");
    }
  };

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage onSelectOption={handelSelcectOption} />;
      case "creative-ai":
        return <CreateAI onBack={handelBack} />;
      case "create-scratch":
        return <ScratchPage onBack={handelBack} />;
      default:
        console.error(`Invalid page state: ${page}`);
        return (
          <div className="text-center text-red-500">
            <p>Error: Invalid page state.</p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
}

export default RenderPage;
