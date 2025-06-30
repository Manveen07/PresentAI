import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { Plus } from "lucide-react";
import React from "react";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";

type DropZoneProps = {
  index: number;
  parentId: string;
  slideId: string;
};

const DropZone = ({ index, parentId, slideId }: DropZoneProps) => {
  const { addComponentInSlide } = useSlideStore();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "CONTENT_ITEM", // Removed the leading space
    drop: (item: {
      type: string;
      componentType: string;
      label: string;
      component: ContentItem;
    }) => {
      if (item.type === "component") {
        addComponentInSlide(
          slideId,
          {
            ...item.component,
            id: v4(),
          },
          parentId,
          index
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-4 transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="w-full h-full flex items-center justify-center text-sm text-blue-600">
          Drop here
        </div>
      )}
    </div>
  );
};

export default DropZone;
