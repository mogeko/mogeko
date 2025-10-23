import { RichText } from "@/components/text";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { retrievePage } from "@/lib/retrieve-page";

export const PostBreadcrumbItem: React.FC<{
  id: Promise<string | undefined>;
}> = async (props) => {
  const page = await props.id.then(retrievePage);

  if (page?.properties.Name.type === "title") {
    return (
      <BreadcrumbItem>
        <Link href={`/posts/${page.id}`}>
          <RichText richText={page.properties.Name.title} />
        </Link>
      </BreadcrumbItem>
    );
  }
};

export const PostHeader: React.FC<{
  id: Promise<string | undefined>;
}> = async (props) => {
  const page = await props.id.then(retrievePage);

  if (page?.properties.Name.type === "title") {
    return (
      <Heading id={page.id} className="my-1" level={1}>
        <RichText richText={page.properties.Name.title} />
      </Heading>
    );
  }
};
