import { intlFormat } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { notion, type PageObjectResponse } from "@/lib/notion";

type AuthorProps = { page: PageObjectResponse };

export const Author: React.FC<AuthorProps> = async ({ page }) => {
  const user_id = page.created_by.id /* Long ID */;
  const { avatar_url, name } = await notion.users.retrieve({ user_id });
  const date = page.properties["Publish Date"];
  const publidhDate = date.type === "date" ? date.date?.start : null;

  return (
    <div className="flex justify-start items-center">
      {avatar_url && (
        <Avatar
          src={avatar_url}
          className="w-[43px] mr-[calc(5ch-43px)]"
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
