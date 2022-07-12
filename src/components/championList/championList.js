import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ChampionIcon } from "../icons/championIcon";
import styles from "./championlist.module.scss";
import championJson from "../../../lol_data/champion.json";
import Link from "next/link";
import { LoadingSpinner } from "../loadingSpinner";
const championData = Object.values(championJson);

function ChampionList({ filter, counts, linkGenerator, loading }) {
  const sortedChampions = useMemo(() => {
    return championData.sort((champA, champB) => {
      if (counts && counts.length > 0) {
        const aCount =
          counts.find((count) => count.champion_id === Number(champA.key))
            ?.count || 0;
        const bCount =
          counts.find((count) => count.champion_id === Number(champB.key))
            ?.count || 0;
        return bCount - aCount;
      } else {
        return 0;
      }
    });
  }, [counts]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
        Loading...
      </div>
    );
  }

  // TODO include message if we filter out the entire list
  return (
    <div className={styles.container}>
      {sortedChampions.map((champ) => {
        if (filter && !filter(champ)) return null;

        const count =
          counts?.find((count) => count.champion_id === Number(champ.key))
            ?.count || 0;

        if (counts && count === 0) {
          return null;
        }
        return (
          <div key={champ.key} className={styles.championContainer}>
            <Link href={linkGenerator(champ.key)} prefetch={false}>
              <a>
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
      {sortedChampions.length === 0 && <div>No results found</div>}
    </div>
  );
}

ChampionList.propTypes = {
  filter: PropTypes.func,
  linkGenerator: PropTypes.func.isRequired,
  counts: PropTypes.arrayOf(
    PropTypes.shape({
      champion_id: PropTypes.number,
      count: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
};

export default ChampionList;
