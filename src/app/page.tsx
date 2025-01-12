import styles from "./page.module.scss";
import {
  MASTODON_ACCOUNT_ID,
  MASTODON_SERVER,
  ORGANISATION_CONTACT,
} from "../utils/constants";
import buildMetadata from "../utils/metadata";
import { Fragment } from "react";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import Anchor from "../components/a";
import HorizontalRule from "../components/hr";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { parseMarkdown, renderMarkdown } from "../utils/markdown";
import type { MarkdownRootNode } from "../utils/markdown";

const htmlToMarkdown = new NodeHtmlMarkdown({});

export async function generateMetadata() {
  return buildMetadata({
    pathname: "/",
    title: "Adjointe au maire à l’urbanisme à Douai",
    description:
      "Découvrez le regard de Stéphanie Stiernon élue locale écologiste du Douaisis.",
  });
}

export default async function Page() {
  const body = (await (
    await fetch(
      `https://${MASTODON_SERVER}/api/v1/accounts/${MASTODON_ACCOUNT_ID}/statuses`,
      {
        headers: new Headers({
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
        }),
        mode: "cors",
        cache: "default",
      }
    )
  ).json()) as Status[];
  const toots = body
    .filter((toot) => !toot.in_reply_to_id)
    .filter((toot) => toot.content)
    .map((toot) => {
      const text = parseMarkdown(
        htmlToMarkdown.translate(toot.content)
      ) as MarkdownRootNode;

      return {
        id: toot.id,
        createdAt: toot.created_at,
        text,
        url: toot.url,
      };
    })
    .slice(0, 3);

  return (
    <ContentBlock>
      <Heading1>Bienvenue</Heading1>
      <Paragraph>
        Élue locale (adjointe au maire à l’urbanisme à Douai et conseillère
        communautaire à Douaisis Agglo), je partage ici mon action pour Douai et
        le Douaisis.
      </Paragraph>
      <Paragraph>
        À Douai, je fais partie de la majorité d’union de la gauche avec les
        élu·es écologistes. Nous y portons notre spécificité et faisons entendre
        la voix de l’écologie tout en agissant au titre des délégations que nous
        avons obtenues.
      </Paragraph>
      <Paragraph>
        À Douaisis Agglo, au sein du groupe Douaisis Solidarité Écologie, nous
        formons une opposition constructive mais sans concessions à l’unanimisme
        ambiant trouvé à notre arrivée.
      </Paragraph>
      <Paragraph>
        Sur ce site, vous pouvez trouver{" "}
        <Anchor
          href={
            "/news/2024"
            //   `/news/${new Intl.DateTimeFormat("fr-FR", {
            //   timeZone: "Europe/Paris",
            //   dateStyle: "short",
            // })
            //   .format(Date.now())
            //   .split("/")
            //   .pop()}`
          }
          title="Voir ma revue de presse"
        >
          une revue de presse
        </Anchor>{" "}
        avec les articles qui citent mes interventions ou réalisations.
      </Paragraph>
      <Paragraph>D’autres sections seront ajoutées bientôt&nbsp;!</Paragraph>
      <Heading2>Dialoguons&nbsp;!</Heading2>
      <Paragraph>
        N’hésitez pas{" "}
        <Anchor
          href={`mailto:${ORGANISATION_CONTACT}`}
          title="Contacter Stéphanie Stiernon"
        >
          à me contacter
        </Anchor>{" "}
        pour réagir au contenu de ce site ou vous inscrire à la lettre
        d’information.
      </Paragraph>
      <aside className={styles.toots}>
        <Heading2>Derniers messages Mastodon&nbsp;:</Heading2>
        <HorizontalRule />
        {toots.map((toot) => (
          <Fragment key={toot.id}>
            {renderMarkdown({ index: 0 }, toot.text)}
            <Paragraph>
              Publié le{" "}
              <Anchor
                href={toot.url as string}
                title="Voir le toot sur Mastodon"
              >
                {new Intl.DateTimeFormat("fr-FR", {
                  timeZone: "Europe/Paris",
                  dateStyle: "full",
                  timeStyle: "medium",
                }).format(Date.parse(toot.createdAt))}
                .
              </Anchor>
            </Paragraph>
            <HorizontalRule />
          </Fragment>
        ))}
      </aside>
    </ContentBlock>
  );
}

// Types generated with `schema2dts` via:
// https://github.com/samwightt/mastodon-openapi
type Status = NonNullable<{
  id: NonNullable<string>;
  uri: NonNullable<string>;
  created_at: NonNullable<string>;
  account: Account;
  content: NonNullable<string>;
  visibility: "public" | "unlisted" | "private" | "direct";
  sensitive: NonNullable<boolean>;
  spoiler_text: NonNullable<string>;
  media_attachements: NonNullable<Attachment[]>;
  application: Application;
  url?: NonNullable<string>;
  in_reply_to_id?: NonNullable<string>;
  in_reply_to_account_id?: NonNullable<string>;
  reblog?: Status;
  poll?: Poll;
  card?: Card;
  language?: NonNullable<string>;
  text?: NonNullable<string>;
  mentions: NonNullable<Mention[]>;
  tags: NonNullable<Tag[]>;
  emojis: NonNullable<Emoji[]>;
  reblogs_count: NonNullable<number>;
  favourites_count: NonNullable<number>;
  replies_count: NonNullable<number>;
  favourited?: NonNullable<boolean>;
  reblogged?: NonNullable<boolean>;
  muted?: NonNullable<string>;
  bookmarked?: NonNullable<string>;
  pinned?: NonNullable<string>;
}>;
type Field = NonNullable<{
  name: NonNullable<string>;
  value: NonNullable<string>;
  verified_at?: NonNullable<string>;
}>;
type Emoji = NonNullable<{
  shortcode: NonNullable<string>;
  url: NonNullable<string>;
  static_url: NonNullable<string>;
  visible_in_picker: NonNullable<boolean>;
  category?: NonNullable<string>;
}>;
type Attachment = NonNullable<{
  id: NonNullable<string>;
  url: NonNullable<string>;
  preview_url: NonNullable<string>;
  remote_url?: NonNullable<string>;
  description?: NonNullable<string>;
  blurhash?: NonNullable<string>;
}>;
type Poll = NonNullable<{
  id: NonNullable<string>;
  expires_at?: NonNullable<string>;
  expired: NonNullable<boolean>;
  multiple: NonNullable<boolean>;
  votes_count: NonNullable<number>;
  voters_count?: NonNullable<number>;
  voted?: NonNullable<boolean>;
  own_votes?: NonNullable<NonNullable<number>[]>;
  options: NonNullable<
    NonNullable<{
      title: NonNullable<string>;
      votes_count?: NonNullable<number>;
    }>[]
  >;
  emojis: NonNullable<Emoji[]>;
}>;
type Card = NonNullable<{
  url: NonNullable<string>;
  title: NonNullable<string>;
  description: NonNullable<string>;
  type: "link" | "photo" | "video" | "rich";
  author_name?: NonNullable<string>;
  author_url?: NonNullable<string>;
  provider_name?: NonNullable<string>;
  provider_url?: NonNullable<string>;
  html?: NonNullable<string>;
  width?: NonNullable<number>;
  height?: NonNullable<number>;
  image?: NonNullable<string>;
  embed_url?: NonNullable<string>;
  blurhash?: NonNullable<string>;
}>;
type Mention = NonNullable<{
  id: NonNullable<string>;
  username: NonNullable<string>;
  acct: NonNullable<string>;
  url: NonNullable<string>;
}>;
type Tag = NonNullable<{
  name: NonNullable<string>;
  url: NonNullable<string>;
  history?: NonNullable<History[]>;
}>;
type History = NonNullable<{
  day: NonNullable<string>;
  uses: NonNullable<string>;
  accounts: NonNullable<string>;
}>;
type Account = NonNullable<{
  id: NonNullable<string>;
  username: NonNullable<string>;
  acct: NonNullable<string>;
  url: NonNullable<string>;
  moved?: Account;
  fields?: Field;
  bot?: NonNullable<boolean>;
  suspended?: NonNullable<boolean>;
  mute_expires_at?: NonNullable<string>;
  created_at: NonNullable<string>;
  last_status_at?: NonNullable<string>;
  statuses_count: NonNullable<number>;
  followers_count: NonNullable<number>;
  following_count: NonNullable<number>;
  display_name: NonNullable<string>;
  note: NonNullable<string>;
  avatar: NonNullable<string>;
  avatar_static: NonNullable<string>;
  header: NonNullable<string>;
  header_static: NonNullable<string>;
  locked: NonNullable<boolean>;
  emojis: NonNullable<Emoji[]>;
  discoverable: NonNullable<string>;
}>;
type Application = NonNullable<{
  name: NonNullable<string>;
  website?: NonNullable<string>;
  vapid_key?: NonNullable<string>;
}>;
