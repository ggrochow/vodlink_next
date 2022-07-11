import styles from "./legalText.module.scss";

function LegalText() {
  return (
    <p className={styles.text}>
      [Your product] {"isn't"} endorsed by Riot Games and {"doesn't"} reflect
      the views or opinions of Riot Games or anyone officially involved in
      producing or managing Riot Games properties. Riot Games, and all
      associated properties are trademarks or registered trademarks of Riot
      Games, Inc.
    </p>
  );
}

export default LegalText;
