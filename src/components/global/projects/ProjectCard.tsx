"use client";
import { motion } from "framer-motion";

import React from "react";
import { itemVariants, themes, timeAgo } from "@/lib/constant";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "../project-card/thumbnail-preview";

// import AlertDialogBox from "../alert-dialog";
// import { recoverproject, deleteProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { JsonValue } from "@prisma/client/runtime/library";
import { buyProduct } from "@/actions/lemonSqueezy";

type props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
  isSellable?: boolean;
};

export const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,
  themeName,
  isSellable,
}: props) => {
  const { setSlides } = useSlideStore();
  const router = useRouter();

  const handelNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    // console.log("TEMP PROJECT CARD ⭕⭕⭕⭕", slideData);
    router.push(`/presentation/${projectId}`);
  };
  const theme = themes.find((t) => t.name === themeName) || themes[0];
  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handelNavigation}
      >
        <ThumbnailPreview
          theme={theme}
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2 ">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isSellable ? (
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                onClick={() => {
                  // Replace this with actual buy handler
                  buyProduct("");
                  toast.info("Buy functionality not implemented yet.");
                }}
              >
                Buy
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
