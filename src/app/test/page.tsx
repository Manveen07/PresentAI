"use client";

import React, { useState } from "react";
import { MasterRecursiveComponent } from "../(protected)/presentation/[presentationid]/_components/editor/MasterRecursiveComponent";

import { ContentItem } from "@/lib/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialSlideContent: ContentItem = {
  id: "4cf94d89-7701-4613-b9fe-227964547a31",
  type: "column",
  name: "Root Column",
  content: [
    {
      id: "42fd5487-189d-4147-86de-0727b3194ac5",
      name: "Image and text",
      type: "resizable-column",
      content: [
        {
          id: "caca1b01-022f-43d7-a470-0ea6dc5d6949",
          name: "Column",
          type: "column",
          content: [
            {
              id: "00838c43-c1a3-4c80-a398-018208ad5f43",
              name: "Image",
              type: "image",
              content:
                "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=2070&auto=format&fit=crop",
              alt: "Cloud computing SaaS image",
              className: "p-3",
            },
          ],
        },
        {
          id: "5fdd250b-ba38-4dc7-87f7-d514955bc788",
          name: "Column",
          type: "column",
          className: "w-full h-full p-8 flex justify-center items-center",
          content: [
            {
              id: "6b2dcab7-498b-491c-b23a-7e743ddcc447",
              name: "Heading1",
              type: "heading1",
              content: "The SaaS Promise",
              placeholder: "Heading1",
            },
            {
              id: "8dc2531d-daee-4dbd-9c49-a5109dc2e310",
              name: "Paragraph",
              type: "paragraph",
              content:
                "The initial allure of SaaS lies in its seemingly simple concept: software delivered over the internet. Access applications from anywhere, anytime, without the hassle of installation or maintenance.",
              placeholder: "start typing here",
            },
          ],
        },
      ],
      className: "border",
    },
  ],
};

export default function TestPage() {
  const [content, setContent] = useState<ContentItem>(initialSlideContent);

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => {
    const updateContent = (item: ContentItem): ContentItem => {
      if (item.id === contentId) {
        return { ...item, content: newContent };
      }
      if (Array.isArray(item.content)) {
        return {
          ...item,
          content: item.content.map((subItem) =>
            updateContent(subItem as ContentItem)
          ),
        };
      }
      return item;
    };

    setContent((prev) => updateContent(prev));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <DndProvider backend={HTML5Backend}>
        <MasterRecursiveComponent
          content={content}
          onContentChange={handleContentChange}
          isPreview={false}
          isEditable={true}
          slideId="test-slide"
        />
      </DndProvider>
    </div>
  );
}
