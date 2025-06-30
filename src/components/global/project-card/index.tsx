"use client";
import { motion } from "framer-motion";
import { JsonValue } from "@prisma/client/runtime/library";
import React from "react";
import { itemVariants, themes, timeAgo } from "@/lib/constant";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";

import AlertDialogBox from "../alert-dialog";
import { recoverproject, deleteProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
  isSellable?: boolean;
};

const ProjectCard = ({
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
  const [loading, setLoading] = React.useState(false);
  const [open, setopen] = React.useState(false);
  const handelDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", { description: "Project not found" });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Oopse!", {
          description: res.error || "Something went wrong ",
        });
        return;
      }
      setopen(false);
      router.refresh();
      toast.success("success", {
        description: "Project deleted successfully",
      });
    } catch (e) {
      console.log(e);
      toast.error("Oopse!", { description: "Failed to delete project" });
    }
  };
  const handelRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", { description: "Project not found" });
      return;
    }
    try {
      const res = await recoverproject(projectId);
      if (res.status !== 200) {
        toast.error("Oopse!", {
          description: res.error || "Something went wrong ",
        });
        return;
      }
      setopen(false);
      router.refresh();
      toast.success("success", {
        description: "Project recovered successfully",
      });
    } catch (e) {
      console.log(e);
      toast.error("Oopse!", { description: "Failed to recover project" });
    }
    setLoading(false);
  };

  const handelNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
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
            {/* {isSellable ? (
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                onClick={() => {
                  // Replace this with actual buy handler
                  toast.info("Buy functionality not implemented yet.");
                }}
              >
                Buy
              </Button>
            ) : isDelete ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                handelOpen={() => setopen(!open)}
                loading={loading}
                open={open}
                onClick={handelRecover}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background-80 dark:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project"
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                onClick={handelDelete}
                loading={loading}
                open={open}
                handelOpen={() => setopen(!open)}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background-80 dark:bg-background-90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )} */}

            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                handelOpen={() => setopen(!open)}
                loading={loading}
                open={open}
                onClick={handelRecover}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background-80 dark:bg-background-90
                "
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project "
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                onClick={handelDelete}
                loading={loading}
                open={open}
                handelOpen={() => setopen(!open)}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background-80 dark:bg-background-90
                "
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
