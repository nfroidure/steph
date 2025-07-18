import { pathJoin } from "../../utils/files";
import { readEntries } from "../../utils/frontmatter";
import buildMetadata from "../../utils/metadata";
import { readParams } from "../../utils/params";
import { slicePage } from "../../utils/pagination";
import {
  entriesToBaseListingMetadata,
  POSTS_PER_PAGE,
  type BlogPost,
} from "../../utils/blogPost";
import BlogEntries from "./entries";
import { type BasePagingPageMetadata } from "../../utils/contents";
import { type BuildQueryParamsType } from "../../utils/params";
import { type Metadata } from "next";

export type Props = BasePagingPageMetadata<BlogPost>;

const PARAMS_DEFINITIONS = {
  page: {
    type: "number",
    mode: "unique",
  },
} as const;

type Params = BuildQueryParamsType<typeof PARAMS_DEFINITIONS>;

export async function generateMetadata(props: {
  params?: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = params?.page || 1;

  const title = `Blog${page && page !== 1 ? ` - page ${page}` : ""}`;
  const description =
    "Retrouvez ici les sujets que je souhaite développer ou mettre plus particulièrement en valeur.";

  const metadata = await buildMetadata({
    pathname: `/blog${page && page !== 1 ? `/pages/${page}` : ""}`,
    title,
    description,
  });

  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates || {}),
      types: {
        ...(metadata.alternates?.types || {}),
        "application/rss+xml": [{ url: "/blog.rss", title: `${title} (RSS)` }],
        "application/atom+xml": [
          { url: "/blog.atom", title: `${title} (Atom)` },
        ],
      },
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const castedParams = readParams(PARAMS_DEFINITIONS, params || {}) as Params;
  const page = castedParams?.page || 1;
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<BlogPost>(pathJoin(".", "contents", "blog")),
  );
  const entries = slicePage(baseListingMetadata.entries, page, POSTS_PER_PAGE);

  return (
    <BlogEntries
      entries={entries}
      page={page}
      pagesCount={baseListingMetadata.pagesCount}
    />
  );
}
