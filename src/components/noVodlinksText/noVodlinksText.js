import styles from "./noVodlinksText.module.scss";

function NoVodlinksText() {
  return (
    <div className={styles.container}>
      <p>No VODs found for this search</p>
    </div>
  );
}

export default NoVodlinksText;
