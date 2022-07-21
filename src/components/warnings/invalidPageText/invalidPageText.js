import styles from "./invalidPageText.module.scss";

function InvalidPageText() {
  return (
    <div className={styles.container}>
      <p>
        No VODs on this page, press {"<"} or {"<-"} above to go back results.
      </p>
    </div>
  );
}
export default InvalidPageText;
