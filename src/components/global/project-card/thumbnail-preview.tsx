import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationid]/_components/editor/MasterRecursiveComponent";
import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import React from "react";

type Props = {
  slide: Slide;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
      className={cn(
        " w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2"
      )}
    >
      {slide ? (
        <div className=" scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          <MasterRecursiveComponent
            slideId={slide.id}
            content={slide.content}
            onContentChange={() => {}}
            isEditable={false}
            isPreview={true}
          ></MasterRecursiveComponent>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-600">
          <Image className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
