import "../styles/globals.scss";
import styles from "../styles/app.module.scss";
import { LegalText } from "../src/components/legalText";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
      <LegalText />
    </div>
  );
}

export default MyApp;
