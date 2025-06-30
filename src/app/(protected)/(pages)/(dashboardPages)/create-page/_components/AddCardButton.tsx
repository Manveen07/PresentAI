"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  onAddCard: () => void;
}

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      className="w-full relative overflow-hidden bg-gray-100 dark:bg-black rounded-lg cursor-pointer"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
      onClick={onAddCard}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center justify-center w-full">
              <div className="w-[30%] h-[1px] bg-gray-300 dark:bg-neutral-600"></div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 p-0 mx-2 bg-white dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-600 border-gray-300 dark:border-neutral-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddCard();
                }}
                aria-label="Add new Card"
              >
                <Plus className="h-4 w-4 text-gray-600 dark:text-white" />
              </Button>
              <div className="w-[30%] h-[1px] bg-gray-300 dark:bg-neutral-600"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
