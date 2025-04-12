import { Avatar } from "@/components/ui/avatar";
import type { PageObjectResponse } from "@/lib/api-endpoints";
import { notion } from "@/lib/notion";
import { intlFormat } from "date-fns";

type AuthorProps = { user_id: string; page: PageObjectResponse };

export const Author: React.FC<AuthorProps> = async ({ user_id, page }) => {
  const { avatar_url, name } = await notion.users.retrieve({ user_id });
  const date = page.properties["Publish Date"];
  const publidhDate = date.type === "date" && date.date?.start;

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
        <p>{publidhDate && intlFormat(publidhDate)}</p>
      </div>
    </div>
  );
};
