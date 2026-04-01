import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";

import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { getMarkdownRemarkPlugins, type TocItem } from "@/lib/markdown";

const mdxComponents = {
  Callout,
  CodeBlock
};

export async function compileDocMdx(source: string) {
  const toc: TocItem[] = [];

  const result = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [...getMarkdownRemarkPlugins(toc)],
        rehypePlugins: [rehypeSlug]
      }
    },
    components: mdxComponents
  });

  return {
    content: result.content,
    toc
  };
}
