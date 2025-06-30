import { onAuthenticateUser } from "@/actions/user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";
import AppSidebar from "@/components/global/app-sidebar";
import { getRecentProjects } from "@/actions/project";
import UpperInfoBar from "@/components/global/upper-info-bar";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const recentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) {
    redirect("/sign-in");
  }
  return (
    <SidebarProvider>
      <AppSidebar
        user={checkUser.user}
        recentProjects={recentProjects.data || []}
      ></AppSidebar>
      <SidebarInset>
        <UpperInfoBar user={checkUser.user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default layout;
