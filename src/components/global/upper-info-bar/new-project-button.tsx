"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function NewProjectButton({ user }: { user: User }) {
  const router = useRouter();
  return (
    <Button
      className="bg-background-90 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed"
      disabled={!user?.subscription}
      onClick={() => router.push("/create-page")}
    >
      <Plus />
      New Project
    </Button>
  );
}

export default NewProjectButton;
