"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavMain from "@/components/global/app-sidebar/nav-main";
import NavFooter from "@/components/global/app-sidebar/navv-footer";
import { Project, User } from "@prisma/client";
import RecentOpen from "./recent-open";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { data } from "@/lib/constant";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
} & { user: User } & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0" />
      <SidebarMenuButton
        size={"lg"}
        className="data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src="./Untitled design.png" alt="Logo" />
            <AvatarFallback>VI</AvatarFallback>
          </Avatar>
        </div>
        <span className="truncate text-primary text-3xl font-semibold">
          PresentAi
        </span>
      </SidebarMenuButton>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter PrismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
