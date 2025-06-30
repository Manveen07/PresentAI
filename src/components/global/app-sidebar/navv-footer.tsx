"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { buySubcription } from "@/actions/lemonSqueezy";
import { toast } from "sonner";

const NavFooter = ({ PrismaUser }: { PrismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  //
  const handleUpgrading = async () => {
    setLoading(true);

    try {
      const res = await buySubcription(PrismaUser.id);
      // console.log(
      //   "Redirect URL:",
      //   `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`
      // );
      // console.log("Response:", res); // 💡 Add this
      if (res.status !== 200) {
        // console.error("[Upgrade Failed]", res); // 💡 Add this
        throw new Error(res.message || "Failed to Upgrade Subscription");
      }

      router.push(res.url);
    } catch (error) {
      console.error("[Upgrade Error]:", error); // 💡 Add this
      toast.error("Error", {
        description: "Failed to Upgrade Subscription",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!PrismaUser?.subscription && (
            <div className="flex flex-col items-start gap-4 p-2 pb-3 bg-background-80 rounded-xl ">
              <div className="flex flex-col items-start gap-1 ">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">PresentAi+ </span>
                </p>
                <span className="text-sm dark:text-secondary">
                  Unlock all features including Ai and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold"
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgrading}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="flex flex-col flex-1 text-left text-sm leading-light group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">
                  {user?.fullName || "Guest User"}
                </span>
                <span className="truncate text-secondary">
                  {user?.emailAddresses?.[0]?.emailAddress ||
                    "No email available"}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
export default NavFooter;
