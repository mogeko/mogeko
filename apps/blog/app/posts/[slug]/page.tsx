import { allPosts } from "@blog/content";
import { useMDXComponent } from "@blog/content/runtime";
import type { NextPage } from "next";
import { notFound } from "next/navigation";

import "@blog/content/typography.css";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    params: { slug: post._meta.path },
  }));
}

export const dynamicParams = false;

const Page: NextPage<{
  params: Promise<{ slug: string }>;
}> = async ({ params }) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._meta.path === slug);

  if (!post) return notFound();

  const MDXContent = useMDXComponent(post.mdx);

  return (
    <div>
      <h1>{post.title}</h1>
      <main>
        <MDXContent />
      </main>
    </div>
  );
};

export default Page;
