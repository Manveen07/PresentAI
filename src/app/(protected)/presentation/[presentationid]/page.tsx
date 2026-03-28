"use client";
import { getProjectById } from "@/actions/project";
import { themes } from "@/lib/constant";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { toast } from "sonner";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./_components/Navbar/Navbar";
import LayoutPreview from "./editor-sidebar/leftsidebar/LayoutPreview";
import Editor from "./_components/editor/Editor";
import EditorSidebar from "./_components/rightSidebar";

function Page() {
  const router = useRouter();
  const { setSlides, setProject, currentTheme, setCurrentThme } =
    useSlideStore();
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params.presentationid as string);
        const isowned = res.data?.isOwned === true;
        if (res.status !== 200 || !res.data) {
          toast.error("Error", {
            description: "Unable to fetch Project",
          });
          router.push("/dashboard");
          return;
        }
        const findTheme = themes.find(
          (theme) => theme.name == res.data.themeName
        );
        setCurrentThme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
        setIsOwned(isowned);

        // console.log("Project data:", res.data); // ✅ Add this
        // console.log("Current theme:", findTheme); // ✅ Add this
      } catch (error) {
        console.error("Failed to load presentation:", error);
        toast.error("Error", {
          description: "An unexpected Error Occured",
        });
        // Handle error appropriately (e.g., show error message)
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Navbar presentationId={params.presentationid as string} />

        <div
          className="flex-1 flex overflow-hidden pt-16 "
          style={{
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 ml-64  pr-16 ">
            {/* did a  change 1 removed pr-16 added  p-4 overflow-y-auto*/}
            <Editor isEditable={isOwned} />
          </div>

          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  );
}

export default Page;
