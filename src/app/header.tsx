import { ORGANISATION_NAME } from "../utils/constants";
import styles from "./header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <Link className={styles.link} href="/">
          <span className={styles.text}>{ORGANISATION_NAME}</span>
        </Link>
      </div>
    </header>
  );
}
