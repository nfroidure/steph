import styles from "./entries.module.scss";
import Anchor from "../../components/a";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Items from "../../components/items";
import Paragraph from "../../components/p";
import { type BlogPost } from "../../utils/blogPost";
import { type BasePagingPageMetadata } from "../../utils/contents";

export default function BlogEntries({
  entries,
  page,
  pagesCount,
}: BasePagingPageMetadata<BlogPost>) {
  return (
    <ContentBlock>
      <Heading1>Blog</Heading1>
      <Paragraph>
        Retrouvez ici les sujets que je souhaite développer ou mettre plus
        particulièrement en valeur.
      </Paragraph>

      <Items entries={entries} base={"/blog/"} />

      <nav className={styles.pagination}>
        {page > 1 ? (
          <Anchor
            icon="arrow-left"
            href={page > 2 ? `/blog/pages/${page - 1}` : "/blog"}
            rel="previous"
            title={`Aller à la page ${page - 1}`}
          >
            Précédent
          </Anchor>
        ) : null}{" "}
        {page < pagesCount ? (
          <Anchor
            icon="arrow-right"
            iconPosition="last"
            href={`/blog/pages/${page + 1}`}
            rel="next"
            title={`Aller à la page ${page + 1}`}
          >
            Suivant
          </Anchor>
        ) : null}
      </nav>
    </ContentBlock>
  );
}
