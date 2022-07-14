import styles from "./loadingSpinner.module.scss";

function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
      <p className={styles.text}>
        Loading
        <span className={styles.one}>.</span>
        <span className={styles.two}>.</span>
        <span className={styles.three}>.</span>
      </p>
    </div>
  );
}

export default LoadingSpinner;
