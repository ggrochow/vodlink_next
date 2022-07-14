import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ChampionIcon } from "../icons/championIcon";
import styles from "./championlist.module.scss";
import championJson from "../../../lol_data/champion.json";
import Link from "next/link";

function ChampionList({ counts, linkGenerator, onChampionClick }) {
  const sortedCounts = useMemo(() => {
    return counts.sort((countA, countB) => countB.count - countA.count);
  }, [counts]);

  return (
    <div className={styles.container}>
      {sortedCounts.map((countObject) => {
        const { count, champion_id } = countObject;
        const champ = championJson[champion_id];

        if (!champ) {
          return null;
        }

        return (
          <div key={champ.key} className={styles.championContainer}>
            <Link href={linkGenerator(champ.key)} prefetch={false}>
              <a
                onClick={() => {
                  if (onChampionClick) {
                    onChampionClick(champ.key);
                  }
                }}
              >
                <div className={styles.iconContainer}>
                  <ChampionIcon
                    image={champ.imageUrl}
                    placeholder={champ.placeholderBase64}
                    name={champ.name}
                    height={50}
                    width={50}
                  />
                </div>
              </a>
            </Link>
            <div className={styles.name}>{count}</div>
          </div>
        );
      })}
      {sortedCounts.length === 0 && <div>No results found</div>}
    </div>
  );
}

ChampionList.propTypes = {
  linkGenerator: PropTypes.func.isRequired,
  counts: PropTypes.arrayOf(
    PropTypes.shape({
      champion_id: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  onChampionClick: PropTypes.func,
};

export default ChampionList;
