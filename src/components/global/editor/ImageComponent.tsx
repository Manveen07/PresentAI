// import Image from "next/image";
// import React from "react";
// import UploadImage from "./UploadImage";

// type Props = {
//   src: string;
//   alt: string;
//   className?: string;
//   isPreview: boolean;
//   contentId: string;
//   onContentChange: (
//     contentId: string,
//     newContent: string | string[] | string[][]
//   ) => void;
//   isEditable: boolean;
// };

// const ImageComponent = ({
//   src,
//   alt,
//   className,
//   isPreview,
//   contentId,
//   onContentChange,
//   isEditable,
// }: Props) => {
//   return (
//     <div className={`relative group w-full h-full rounded-lg`}>
//       <Image
//         src={src}
//         alt={alt}
//         width={isPreview ? 48 : 800}
//         height={isPreview ? 48 : 800}
//         className={`object-cover w-full h-full rounded-lg ${className}`}
//       />
//       {!isPreview && isEditable && (
//         <div className="absolute top-0 left-0  group-hover:block">
//           <UploadImage
//             contentId={contentId}
//             onContentChange={onContentChange}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageComponent;

import UploadImage from "./UploadImage";
import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
};

const ImageComponent = ({
  alt,
  contentId,
  onContentChange,
  src,
  className,
  isEditable,
  isPreview,
}: Props) => {
  // WIP : Add openai image
  return (
    <div className={`relative group w-full h-full rounded-lg`}>
      <Image
        src={src}
        width={isPreview ? 400 : 800}
        height={isPreview ? 400 : 800}
        alt={alt}
        className={`object-cover w-full h-full rounded-lg ${className}`}
      />
      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block">
          <UploadImage
            contentId={contentId}
            onContentChange={onContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
