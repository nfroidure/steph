import styles from "./page.module.scss";
import { pathJoin } from "../../../utils/files";
import { readEntries } from "../../../utils/frontmatter";
import buildMetadata from "../../../utils/metadata";
import { toASCIIString } from "../../../utils/ascii";
import { parseMarkdown, renderMarkdown } from "../../../utils/markdown";
import { fixText } from "../../../utils/text";
import { datedPagesSorter } from "../../../utils/contents";
import { Fragment } from "react";
import ContentBlock from "../../../components/contentBlock";
import Heading1 from "../../../components/h1";
import Heading2 from "../../../components/h2";
import Paragraph from "../../../components/p";
import Anchor from "../../../components/a";
import Heading3 from "../../../components/h3";
import Strong from "../../../components/strong";
import type { MarkdownRootNode } from "../../../utils/markdown";
import type { FrontMatterResult } from "front-matter";
import { BUILD_YEAR, LOCALE, TIME_ZONE } from "../../../utils/constants";

export type NewsItemFrontmatterMetadata = {
  title: string;
  date: string;
  url: string;
  publication: string;
  draft: boolean;
};
export type NewsItem = {
  id: string;
  content: MarkdownRootNode;
} & NewsItemFrontmatterMetadata;

export async function generateMetadata(props: {
  params: Promise<{ year: string }>;
}) {
  const params = await props.params;

  return buildMetadata({
    pathname: `/news/${params.year}`,
    title: `La revue de presse (année ${params.year})`,
    description: `Recueil des articles citant mes propos ou mon action pour l'année année ${params.year}.`,
    image: {
      url: "/images/banner.jpg",
      alt: "Bannière de la revue de presse",
    },
  });
}

export default async function Page(props: {
  params: Promise<{ year: string }>;
}) {
  const params = await props.params;
  const baseEntries = await readEntries<NewsItemFrontmatterMetadata>(
    pathJoin(".", "contents", "news"),
  );
  const years = getYearsFromEntries(baseEntries);
  const entries = baseEntries
    .map((entry) => ({
      ...entry.attributes,
      id: toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .filter(
      (entry) => params.year === new Date(entry.date).getFullYear().toString(),
    )
    .sort(datedPagesSorter);

  return (
    <ContentBlock>
      <Heading1>La revue de presse</Heading1>
      <Paragraph>
        {years.map((year, index) => (
          <Fragment key={`${year}-${index}`}>
            {index > 0 ? " - " : ""}
            <Anchor
              href={`./${year}`}
              title={`Voir la revue de presse de ${year}`}
              className={year === params.year ? styles.selected : ""}
            >
              Année {year}
            </Anchor>
          </Fragment>
        ))}
      </Paragraph>
      <Heading2>En {params.year}</Heading2>
      {entries.length ? (
        <div>
          {entries.map((entry) => (
            <div key={entry.id} className={styles.entry}>
              <Heading3 className={styles.title}>
                <Anchor
                  href={entry.url}
                  title={`Lire le contenu de ${entry.publication}`}
                  className={styles.link}
                >
                  {fixText(entry.title)}
                </Anchor>
              </Heading3>
              <Paragraph>
                Publié le{" "}
                {new Intl.DateTimeFormat(LOCALE, {
                  timeZone: TIME_ZONE,
                  dateStyle: "full",
                  timeStyle: "medium",
                }).format(Date.parse(entry.date))}{" "}
                par <Strong>{entry.publication}</Strong>.
              </Paragraph>
              {renderMarkdown({ index: 0 }, entry.content)}
              <Paragraph>
                <Anchor
                  href={entry.url}
                  title={`Lire le contenu de ${entry.publication}`}
                  icon="arrow-right"
                  iconPosition="last"
                >
                  Lire l’article
                </Anchor>
              </Paragraph>
            </div>
          ))}
        </div>
      ) : (
        <p>
          Aucun article en {params.year} à ce jour, revenez plus tard ou
          consultez les autres années.
        </p>
      )}
    </ContentBlock>
  );
}

export async function generateStaticParams() {
  return getYearsFromEntries(
    await readEntries<NewsItemFrontmatterMetadata>(
      pathJoin(".", "contents", "news"),
    ),
  ).map((year) => ({ year: year }));
}

function getYearsFromEntries(
  entries: FrontMatterResult<NewsItemFrontmatterMetadata>[],
) {
  return [
    ...new Set(
      entries
        .map((entry) =>
          new Intl.DateTimeFormat(LOCALE, {
            timeZone: TIME_ZONE,
            year: "numeric",
          }).format(new Date(entry.attributes.date)),
        )
        .concat(BUILD_YEAR.toString(10)),
    ).values(),
  ]
    .sort()
    .reverse();
}
