import styles from "./addStreamersText.module.scss";

function AddStreamersText() {
  return (
    <div className={styles.container}>
      <p>
        Want to see more results?
        <br />
        <br />
        <a
          href="https://forms.gle/D8fVytvwxLoWWHjH7"
          target="_blank"
          rel="noreferrer"
        >
          Fill out this form to suggest a channel to add
        </a>
      </p>
    </div>
  );
}
export default AddStreamersText;
