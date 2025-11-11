import type { PageObjectResponse } from "@notionhq/client";
import { intlFormat } from "date-fns";
import { Suspense } from "react";
import { Image } from "@/components/image";
import { Spinner } from "@/components/ui/spinner";
import { retrieveUsers } from "@/lib/notion-staffs";

export const Author: React.FC<{ page: PageObjectResponse }> = async (props) => {
  const user_id = props.page.created_by.id /* Long ID */;
  const { avatar_url, name } = await retrieveUsers(user_id);
  const date = props.page.properties["Publish Date"];
  const publidhDate = date.type === "date" ? date.date?.start : null;

  return (
    <div className="flex justify-start items-center">
      {avatar_url && (
        <Suspense fallback={<Spinner className="w-[43px] h-[43px]" />}>
          <Image
            notionId={user_id}
            src={avatar_url}
            className="w-[43px] mr-[calc(5ch-43px)] inline-block relative h-2"
            height={43}
            width={43}
            alt={name ?? "Author"}
          />
        </Suspense>
      )}
      <div>
        <p>{name ?? "Anonymous"}</p>
        <p>{intlFormat(publidhDate ?? props.page.created_time)}</p>
      </div>
    </div>
  );
};
