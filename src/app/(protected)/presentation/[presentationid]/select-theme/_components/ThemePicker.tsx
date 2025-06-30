"use client";
import { generateLayouts } from "@/actions/openai";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Props = {
  selectedTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
};

function ThemePicker({ selectedTheme, themes, onThemeSelect }: Props) {
  const router = useRouter();
  const params = useParams();
  const { project, setSlides, currentTheme } = useSlideStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  const handleGenerateLayouts = async () => {
    setLoading(true);

    if (!selectedTheme) {
      toast.error("Error", {
        description: "Please select a theme",
      });
      setLoading(false);
      return;
    }

    if (!project?.id) {
      toast.error("Error", {
        description: "Please create a project",
      });
      router.push("/create-page");
      setLoading(false);
      return;
    }

    try {
      const res = await generateLayouts(
        params.presentationid as string,
        currentTheme.name
        // JSON.stringify(selectedTheme) //trying new stuff   instead of currentTheme
      );

      console.log("Raw response from generateLayouts:", res); // ✅ Add this
      console.log("Parsed response data:", currentTheme); // ✅ Add this

      if (res?.status !== 200 || !res?.data) {
        throw new Error("Failed to generate layouts");
      }
      toast.success("Success", {
        description: "Layouts generated successfully",
      });
      router.push(`/presentation/${project?.id}`);
      setSlides(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Failed to generate layouts",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
      style={{
        backgroundColor:
          selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className="p-8 space-y-6 flex-shrink-0">
        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a Theme
          </h2>
          <p
            className="text-sm"
            style={{ color: `${selectedTheme.accentColor}80` }}
          >
            Choose from our curated collection or generate a custom theme
          </p>
        </div>
        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          {loading ? (
            <p className="animate-pulse">Generating...</p>
          ) : (
            "Generate Theme"
          )}
        </Button>
      </div>
      <ScrollArea className="flex-grow px-8 pb-8">
        {/* Grid layout to display all themes in a vertical list (can be made responsive) */}
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              whileHover={{ scale: 1.02 }} // Slight scale-up effect on hover
              whileTap={{ scale: 0.98 }} // Slight scale-down effect on tap
            >
              <Button
                onClick={() => onThemeSelect(theme)} // Trigger selection on click
                className="flex flex-col items-start p-6 w-full h-auto gap-4" // Flex column layout, spacing between blocks
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.fontColor,
                  backgroundImage: theme.gradientBackground ?? undefined,
                  backgroundColor: theme.backgroundColor, // fallback for non-gradient themes
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Top Row: Theme Name + Accent Color Dot */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-bold">{theme.name}</span>

                  {/* Accent dot (color preview) */}
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>

                {/* Preview section for title and body styling */}
                <div className="space-y-1 w-full">
                  {/* Sample title styled using accent color */}
                  <div
                    className="text-2xl font-bold"
                    style={{ color: theme.accentColor }}
                  >
                    Title
                  </div>

                  {/* Sample body text and a "link" to show typography */}
                  <div className="text-base opacity-80">
                    Body &{" "}
                    <span style={{ color: theme.accentColor }}>link</span>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ThemePicker;
