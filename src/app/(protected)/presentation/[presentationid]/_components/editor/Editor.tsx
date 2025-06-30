"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { MasterRecursiveComponent } from "./MasterRecursiveComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateSlides } from "@/actions/project";

type Props = {
  isEditable: boolean; // Fixed typo in prop name (was iseEditabe)
};

interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable?: boolean;
}
interface DraggableSlideProps {
  slide: Slide;
  index: number;
  isEditable: boolean;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handelDeelete: (index: string) => void;
}

export const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  isEditable,
  moveSlide,
  handelDeelete,
}) => {
  const ref = useRef(null);
  const { currentSlide, currentTheme, setCurrentSlide, updateContentItem } =
    useSlideStore();
  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: { index, type: "SLIDE" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: isEditable,
  });
  const [, drop] = useDrop({
    accept: [" SLIDE", "LAYOUT"],
    hover(item: { index: number; type: string }) {
      if (!ref.current || !isEditable) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (item.type === "SLIDE") {
        if (dragIndex === hoverIndex) {
          return;
        }
        moveSlide(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });
  drag(drop(ref));

  const handelContentChange = (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => {
    if (isEditable) {
      // console.log("updating content", slide.id, contentId, newContent);
      updateContentItem(slide.id, contentId, newContent);
    }
  };
  // console.log("Slide content:⭕⭕⭕⭕from Editor", slide.content);
  function extractAllTypes(node: any): string[] {
    //DEBUG CODE
    const types: string[] = [];

    function traverse(item: any) {
      if (!item || typeof item !== "object") return;

      if ("type" in item && typeof item.type === "string") {
        types.push(item.type);
      }

      if ("content" in item) {
        const content = item.content;

        if (Array.isArray(content)) {
          content.forEach((child) => traverse(child));
        } else if (typeof content === "object") {
          traverse(content);
        }
      }
    }

    traverse(node);
    return types;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index === currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        isDragging ? "opacity-50" : "opacity-100",
        slide.className
      )}
      style={{ backgroundImage: currentTheme.gradientBackground }}
      onClick={() => {
        setCurrentSlide(index);
        // const allTypes = extractAllTypes(slide);
        // console.log(allTypes);
      }}
    >
      <div className="h-full w-full flex-grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isEditable={isEditable}
          isPreview={false}
          slideId={slide.id}
          onContentChange={handelContentChange}
        />
      </div>
      {isEditable && (
        <Popover>
          <PopoverTrigger asChild className="absolute top-2 left-2">
            <Button size="sm" variant="outline">
              <EllipsisVertical className="w-5 h-5" />
              <span className="sr-only">Slide options</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-fit p-0">
            <div className="flex space-x-2">
              <Button variant={"ghost"} onClick={() => handelDeelete(slide.id)}>
                <Trash className="w-5 h-5 text-red-500" />
                <span className="sr-only">Delete This</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "layout"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => !!isEditable, // Added !! to ensure boolean
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (!isEditable) return null;

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop here
        </div>
      )}
    </div>
  );
};

const Editor = ({ isEditable }: Props) => {
  // Fixed prop name
  const {
    getOrderedSlides,
    reorderSlides,
    slides,
    project,
    removeSlide,
    addSlideAtIndex,
    currentSlide,
  } = useSlideStore();
  const orderedSlides = getOrderedSlides();
  const [loading, setIsLoading] = useState(true);
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return; // Added check for
    if (item.type === "layout") {
      addSlideAtIndex(
        {
          ...item.component,
          id: uuidv4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
    // Implement your drop logic here
    // console.log(item, dropIndex);
  };

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    if (typeof window !== "undefined") setIsLoading(false);
  }, []);

  const saveSLides = useCallback(() => {
    if (isEditable && project) {
      (async () => {
        await updateSlides(project.id, JSON.parse(JSON.stringify(slides)));
      })();
    }
  }, [isEditable, project, slides]);

  useEffect(() => {
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }
    if (isEditable) {
      autosaveTimeoutRef.current = setTimeout(() => {
        saveSLides();
      }, 2000);
    }
    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [slides, isEditable, project]);

  return (
    <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {loading ? (
        <div className="w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}
            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  isEditable={isEditable}
                  moveSlide={moveSlide}
                  handelDeelete={() => {
                    if (isEditable) {
                      // console.log("deleting", slide.id);
                      removeSlide(slide.id);
                    }
                  }}
                />
                {isEditable && (
                  <DropZone
                    index={index + 1}
                    onDrop={handleDrop}
                    isEditable={isEditable}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
