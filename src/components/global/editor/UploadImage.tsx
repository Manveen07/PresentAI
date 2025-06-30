"use client"; // is needed only if you’re using React Server Components
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

type Props = {
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
};

const UploadImage = ({ contentId, onContentChange }: Props) => {
  const handleChangeEvent = (e: { cdnUrl: string | string[] | string[][] }) => {
    onContentChange(contentId, e.cdnUrl);
  };
  return (
    <FileUploaderRegular
      sourceList="local, url, dropbox"
      cameraModes="photo, video"
      classNameUploader="uc-light"
      pubkey="d81cef50e85aa5280803"
      multiple={false}
      onFileUploadSuccess={handleChangeEvent}
      maxLocalFileSizeBytes={10000000}
    />
  );
};

export default UploadImage;
