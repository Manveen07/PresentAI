"use client";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/Headings";
import { ContentItem } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import DropZone from "./DropZone";
import { cn } from "@/lib/utils";
import Paragraph from "@/components/global/editor/Paragraph";
import Divider from "@/components/global/editor/Divider";
import TableOfContents from "@/components/global/editor/TableofContents";

import CalloutBox from "@/components/global/editor/CallOutBox";
import TableComponents from "@/components/global/editor/TableComponents";
import ListComponents, {
  BulletList,
  TodoList,
} from "@/components/global/editor/ListComponents";
import BlockQuote from "@/components/global/editor/BlockQuote";
import ColumnComponent from "@/components/global/editor/ColumnComponent";
import ImageComponent from "@/components/global/editor/ImageComponent";
import CodeBlock from "@/components/global/editor/Codeblock";

interface MasterRecursiveComponentProps {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
}

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({
    content,
    onContentChange,
    isPreview = false,
    isEditable = true,
    slideId,
  }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case "heading1":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading3 {...commonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading4 {...commonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Title {...commonProps} />
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Paragraph {...commonProps} />
          </motion.div>
        );
      case "table":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableComponents
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialRowSize={content.initialColumns}
              initialColSize={content.initialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps} className="w-full h-full">
              <ColumnComponent
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null;
      case "image":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <ImageComponent
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "blockquote":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </motion.div>
        );
      case "numberedList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <ListComponents
              items={content.content as string[]}
              onchange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "bulletList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <BulletList
              items={content.content as string[]}
              onchange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "todoList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TodoList
              items={content.content as string[]}
              onchange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "calloutBox":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CalloutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </motion.div>
        );
      case "codeBlock":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CodeBlock
              code={content.code}
              language={content.language}
              onchange={() => {}}
              className={content.className}
            />
          </motion.div>
        );
      case "tableOfContents":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableOfContents
              items={content.content as string[]}
              onItemClick={(id) => {
                console.log(`Navigate to section: ${id}`);
              }}
              className={content.className}
            />
          </motion.div>
        );
      case "divider":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Divider className={content.className} />
          </motion.div>
        );
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("w-full h-full flex flex-col", content.className)}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={slideId}
                          />
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        slideId={slideId}
                        index={subIndex}
                        isEditable={isEditable}
                      />
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIndex + 1}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }
        return null;
      default:
        return null;
    }
  }
);

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      isPreview = false,
      isEditable = true,
      slideId,
      index,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        );
      }

      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        </React.Fragment>
      );
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";

// type Props = {
//   content: ContentItem;
//   onContentChange: (
//     contentId: string,
//     newContent: string | string[] | string[][]
//   ) => void;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   slideId: string;
//   index?: number;
// };

// const ContentRenderer: React.FC<Props> = React.memo(
//   ({
//     content,
//     onContentChange,
//     slideId,
//     isPreview = false,
//     isEditable = true,
//   }) => {
//     const handleChange = useCallback(
//       (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         onContentChange(content.id, e.target.value);
//       },
//       [content.id, onContentChange]
//     );

//     const commonProps = {
//       placeholder: content.placeholder,
//       value: content.content as string,
//       onChange: handleChange,
//       isPreview: isPreview,
//     };

//     const animationProps = {
//       initial: { opacity: 0, y: 20 },
//       animate: { opacity: 1, y: 0 },
//       transition: { duration: 2 },
//     };

//     // WIP: Complete types
//     switch (content.type) {
//       case "heading1":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <Heading1 {...commonProps}></Heading1>
//           </motion.div>
//         );
//       case "heading2":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <Heading2 {...commonProps}></Heading2>
//           </motion.div>
//         );
//       case "heading3":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <Heading3 {...commonProps}></Heading3>
//           </motion.div>
//         );
//       case "heading4":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <Heading4 {...commonProps}></Heading4>
//           </motion.div>
//         );
//       case "title":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <Title {...commonProps}></Title>
//           </motion.div>
//         );
//       case "paragraph":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <Paragraph {...commonProps} />
//           </motion.div>
//         );
//       case "resizable-column":
//         if (Array.isArray(content.content)) {
//           return (
//             <motion.div className="w-full h-full " {...animationProps}>
//               <ColumnComponent
//                 content={content.content as ContentItem[]}
//                 className={content.className}
//                 onContentChange={onContentChange}
//                 slideId={slideId}
//                 isPreview={isPreview}
//                 isEditable={isEditable}
//               />
//             </motion.div>
//           );
//         }
//         return null;

//       case "image":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <ImageComponent
//               src={
//                 (content.content as string) ||
//                 "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               }
//               alt={content.alt || "image"}
//               className={content.className}
//               isPreview={isPreview}
//               contentId={content.id}
//               onContentChange={onContentChange}
//               isEditable={isEditable}
//             />
//           </motion.div>
//         );

//       case "blockquote":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <BlockQuote>
//               <Paragraph {...commonProps} />
//             </BlockQuote>
//           </motion.div>
//         );

//       case "numberedList":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <ListComponents
//               items={content.content as string[]}
//               onchange={(newItem) => onContentChange(content.id, newItem)}
//               className={content.className}
//             />
//           </motion.div>
//         );

//       case "todoList":
//         return (
//           <motion.div className="w-full h-full " {...animationProps}>
//             <TodoList
//               items={content.content as string[]}
//               onchange={(newItem) => onContentChange(content.id, newItem)}
//               className={content.className}
//             />
//           </motion.div>
//         );
//       case "column":
//         if (Array.isArray(content.content)) {
//           return (
//             <motion.div
//               {...animationProps}
//               className={cn("w-full h-full flex flex-col", content.className)}
//             >
//               {content.content.length > 0 ? (
//                 (content.content as ContentItem[]).map(
//                   (subItem: ContentItem, subIndex: number) => (
//                     <React.Fragment key={subItem.id || `item-${subIndex}`}>
//                       {!isPreview &&
//                         !subItem.restrictToDrop &&
//                         subIndex === 0 &&
//                         isEditable && (
//                           <DropZone
//                             index={0}
//                             parentId={content.id}
//                             slideId={slideId}
//                           />
//                         )}

//                       <MasterRecursiveComponent
//                         content={subItem}
//                         onContentChange={onContentChange}
//                         isPreview={isPreview}
//                         slideId={slideId}
//                         index={subIndex}
//                         isEditable={isEditable}
//                       />

//                       {isPreview && subItem.restrictToDrop && isEditable && (
//                         <DropZone
//                           index={subIndex + 1}
//                           parentId={content.id}
//                           slideId={slideId}
//                         />
//                       )}
//                     </React.Fragment>
//                   )
//                 )
//               ) : isEditable ? (
//                 <DropZone index={0} parentId={content.id} slideId={slideId} />
//               ) : null}
//             </motion.div>
//           );
//         }
//         return null;
//       case "table":
//         return (
//           <motion.div {...animationProps} className="w-full h-full">
//             <TableComponents
//               content={content.content as string[][]}
//               onChange={(newContent) =>
//                 onContentChange(
//                   content.id,
//                   newContent !== null ? newContent : ""
//                 )
//               }
//               initialRowSize={content.initialColumns}
//               initialColSize={content.initialRows}
//               isPreview={isPreview}
//               isEditable={isEditable}
//             />
//           </motion.div>
//         );

//       case "bulletList":
//         return (
//           <motion.div {...animationProps} className="w-full h-full">
//             <BulletList
//               items={content.content as string[]}
//               onchange={(newItems) => onContentChange(content.id, newItems)}
//               className={content.className}
//             />
//           </motion.div>
//         );

//       case "calloutBox":
//         return (
//           <motion.div {...animationProps} className="w-full h-full">
//             <CalloutBox
//               type={content.callOutType || "info"}
//               className={content.className}
//             >
//               <Paragraph {...commonProps} />
//             </CalloutBox>
//           </motion.div>
//         );

//       case "codeBlock":
//         return (
//           <motion.div {...animationProps} className="w-full h-full">
//             <CodeBlock
//               code={content.code}
//               language={content.language}
//               onchange={() => {}}
//               className={content.className}
//             />
//           </motion.div>
//         );

//       case "tableOfContents":
//         return (
//           <motion.div {...animationProps} className="w-full h-full">
//             <TableOfContents
//               items={content.content as string[]}
//               onItemClick={(id) => {
//                 console.log(`Navigate to section: ${id}`);
//               }}
//               className={content.className}
//             />
//           </motion.div>
//         );

//       case "divider":
//         return (
//           <motion.div {...animationProps} className="w-full h-full">
//             <Divider className={content.className} />
//           </motion.div>
//         );
//       default:
//         console.log(`Unknown content type: ${content.type}`, content);
//         return <div>Unknown content type: {content.type}</div>;
//     }
//   }
// );

// ContentRenderer.displayName = "ContentRenderer";

// export const MasterRecursiveComponent: React.FC<Props> = React.memo(
//   ({
//     content,
//     isEditable = true,
//     isPreview = false,
//     onContentChange,
//     slideId,
//     index,
//   }) => {
//     if (isPreview) {
//       return (
//         <React.Fragment>
//           <ContentRenderer
//             content={content}
//             onContentChange={onContentChange}
//             isPreview={isPreview}
//             isEditable={isEditable}
//             slideId={slideId}
//             index={index}
//           />
//         </React.Fragment>
//       );
//     }

//     return (
//       <React.Fragment>
//         <ContentRenderer
//           content={content}
//           onContentChange={onContentChange}
//           isPreview={isPreview}
//           isEditable={isEditable}
//           slideId={slideId}
//           index={index}
//         />
//       </React.Fragment>
//     );
//   }
// );

// MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
