export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
export const LANGUAGE = "fr";
export const LOCALE = "fr-FR";
export const TIME_ZONE = "Europe/Paris";
// The `BUILD_YEAR` env var is always set via NextJS config
export const BUILD_YEAR = parseInt(process.env.BUILD_YEAR as string, 10);
export const ASSET_PREFIX = `${BASE_URL}${BASE_PATH || ""}`;
export const ORGANISATION_LEGAL_NAME = "Stéphanie Stiernon";
export const ORGANISATION_NAME = "Stéphanie Stiernon";
export const ORGANISATION_ADDRESS = "79 rue Alexandre Descatoire 59500 Douai";
export const ORGANISATION_CONTACT = "stephanie.stiernon@gmail.com";
export const ORGANISATION_PRIMARY_COLOR = "#4bb166";
export const PUBLISHER = "Stéphanie Stiernon";
export const DOMAIN_NAME = "stephaniestiernon.fr";
export const MASTODON_ACCOUNT = "stephanie_stiernon";
export const MASTODON_ACCOUNT_ID = "112473414045703174";
export const MASTODON_SERVER = "piaille.fr";
export const FACEBOOK_ACCOUNT = "stephanie.stiernon.1";
export const LINKEDIN_ACCOUNT = "stephanie-stiernon";
export const BLUESKY_ACCOUNT = "";
export const BLUESKY_SERVER = "bsky.social";
export const BLUESKY_APP = "bsky.app";
