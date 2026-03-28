"use client";
import { Button } from "@/components/ui/button";

import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, Share } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProjectById, updateProjectVariantId } from "@/actions/project";
import { buyProduct } from "@/actions/lemonSqueezy";

type Props = { presentationId: string };

function Navbar({ presentationId }: Props) {
  const [variantId, setVariantId] = useState("");
  const [open, setOpen] = useState(false);

  const { currentTheme } = useSlideStore();
  const [isPrestationMode, setIsPresentationMode] = useState(false);
  const [isowned, setIsOwned] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const projectResponse = await getProjectById(presentationId);
        const isOwned = projectResponse.data?.isOwned === true;
        setIsOwned(isOwned);
        // console.log("Is Owned:", isOwned);
      } catch (error) {
        console.error("Error fetching ownership status:", error);
      }
    })();
  }, [presentationId]);

  const handelsave = async () => {
    if (!variantId) {
      toast.error("Please enter a Variant ID");
      return;
    }
    // console.log("Presentation ID:", presentationId);
    // console.log("Variant ID:", variantId);
    const res = await updateProjectVariantId(variantId, presentationId);

    // console.log("Response:", res);
    // console.log(res);

    if (res.status === 200) {
      toast.success(
        "Variant ID updated successfully now this presentation is ready to be sold"
      );
      setOpen(false);
    } else {
      toast.error("Error updating Variant ID");
    }
    setVariantId("");
  };

  const handlecopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link Copied", {
      description: "The Link has been copied to ypur clipboard",
    });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={"/dashboard"} passHref>
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      <Link href="/presentation/template-market" passHref>
        <span className="text-lg font-semibold hidden sm:block">
          Presentation editor
        </span>
      </Link>
      <div className="flex items-center gap-4 ">
        <Button
          style={{ backgroundColor: currentTheme.backgroundColor }}
          variant={"outline"}
          onClick={handlecopy}
        >
          <Share className="w-4 h-4" />
        </Button>
        {isowned ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">sell</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sell as a Template</DialogTitle>
                <DialogDescription>
                  This will allow you to sell this presentation as a template.
                  <br />
                  <br />
                  You must first create a product on LemonSqueezy and copy the
                  Variant ID.
                  <br />
                  Pricing and availability should be managed directly on
                  LemonSqueezy.
                  <br />
                  <a
                    href="https://app.lemonsqueezy.com/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open LemonSqueezy Dashboard ↗
                  </a>
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="variantId" className="text-right">
                    Variant ID
                  </Label>
                  <Input
                    id="variantId"
                    placeholder="e.g. 123456"
                    value={variantId}
                    onChange={(e) => setVariantId(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handelsave}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => {
              buyProduct("");
              toast.info("Buy functionality not implemented yet.");
            }}
          >
            buy to edit{" "}
          </Button>
        )}
        <Button
          variant={"default"}
          className="flex items-center gap-2 "
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>
      {isPrestationMode && (
        <PresentationMode onClose={() => setIsPresentationMode(false)} />
      )}
    </nav>
  );
}

export default Navbar;
