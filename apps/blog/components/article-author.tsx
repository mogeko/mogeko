import { intlFormat } from "date-fns";
import { Suspense } from "react";
import { Image } from "@/components/image";
import { Spinner } from "@/components/ui/spinner";
import { notion } from "@/lib/notion";
import { retrievePage } from "@/lib/retrieve-page";

export const Author: React.FC<{
  id: Promise<string | undefined>;
}> = async ({ id }) => {
  const page = await id.then(retrievePage);

  if (page) {
    const user_id = page.created_by.id /* Long ID */;
    const { avatar_url, name } = await notion.users.retrieve({ user_id });
    const date = page.properties["Publish Date"];
    const publidhDate = date.type === "date" ? date.date?.start : null;

    return (
      <div className="flex justify-start items-center">
        <Suspense fallback={<Spinner className="w-[43px] h-[43px]" />}>
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
        </Suspense>
        <div>
          <p>{name ?? "Anonymous"}</p>
          <p>{intlFormat(publidhDate ?? page.created_time)}</p>
        </div>
      </div>
    );
  }
};
