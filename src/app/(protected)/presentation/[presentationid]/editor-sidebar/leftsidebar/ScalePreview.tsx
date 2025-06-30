import React from "react";
import { Slide } from "../../../../../../lib/types";
import { useSlideStore } from "../../../../../../store/useSlideStore";
import { cn } from "../../../../../../lib/utils";
import { MasterRecursiveComponent } from "../../_components/editor/MasterRecursiveComponent";

type Props = {
  slide: Slide;
  isActive: boolean;
  index: number;
};

function ScalePreview({ slide, index, isActive }: Props) {
  const { currentTheme } = useSlideStore();
  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2 ring-2 ring-primary-80 ring-offset-2",
        isActive
          ? "ring-2 ring-blue-500 ring-offset-2"
          : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-2"
      )}
      style={{
        fontFamily: currentTheme.fontFamily,
        backgroundColor: currentTheme.slideBackgroundColor,
        color: currentTheme.accentColor,
        backgroundImage: currentTheme.gradientBackground,
      }}
    >
      <div className=" scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
        <MasterRecursiveComponent
          slideId={slide.id}
          content={slide.content}
          onContentChange={() => {}}
          isPreview={true}
        ></MasterRecursiveComponent>
      </div>
    </div>
  );
}

export default ScalePreview;
