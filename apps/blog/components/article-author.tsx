import { intlFormat } from "date-fns";
import { Image } from "@/components/image";
import { notion, type PageObjectResponse } from "@/lib/notion";

export const Author: React.FC<{
  page: Promise<PageObjectResponse>;
}> = async (props) => {
  const page = await props.page;
  const user_id = page.created_by.id /* Long ID */;
  const { avatar_url, name } = await notion.users.retrieve({ user_id });
  const date = page.properties["Publish Date"];
  const publidhDate = date.type === "date" ? date.date?.start : null;

  return (
    <div className="flex justify-start items-center">
      {avatar_url && (
        <Image
          uploadId={user_id}
          src={avatar_url}
          className="w-[43px] mr-[calc(5ch-43px)] inline-block relative h-2"
          height={43}
          width={43}
          alt={name ?? "Author"}
        />
      )}
      <div>
        <p>{name ?? "Anonymous"}</p>
        <p>{intlFormat(publidhDate ?? page.created_time)}</p>
      </div>
    </div>
  );
};
