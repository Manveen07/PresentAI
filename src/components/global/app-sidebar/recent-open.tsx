"use client";
import React from "react";
import { Project } from "@prisma/client";
import { toast } from "sonner";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();
  const handelclick = (Projectid: string, slides: JsonValue) => {
    if (!Projectid || !slides) {
      toast.error("Project not found", {
        description: "Please try again",
      });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));

    router.push(`/presentation/${Projectid}`);
  };
  return recentProjects.length === 0 ? (
    <></>
  ) : (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.map((project) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton
              asChild
              tooltip={project.title}
              className={`hover:bg-primary-80`}
            >
              <Button
                variant={"link"}
                onClick={() => handelclick(project.id, project.slides)}
                className="text-xs items-center justify-center"
              >
                <span>{project.title}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
export default RecentOpen;
