import { Image } from "@/components/image";
import type { FilesPropertyItemObjectResponse } from "@/lib/notion";

export const CoverImage: React.FC<{
  property: Pick<FilesPropertyItemObjectResponse, "files">;
  width: number;
  className?: string;
}> = ({ property, width, className }) => {
  return property.files.map((image) => {
    if (image.type === "file") {
      return (
        <div className={className}>
          <Image width={width} src={image.file.url} alt={image.name} />
        </div>
      );
    }

    return null;
  });
};
