import styles from "./participantInfo.module.scss";
import { RankIcon } from "../../icons/rankIcon";
import { MasteryIcon } from "../../icons/masteryIcon";
import PropTypes from "prop-types";
import { ChampionIcon } from "../../icons/championIcon";
import { getChampionById } from "../../../../lol_data/champions";
import { RuneIcon } from "../../icons/runeIcon";

function ParticipantInfo({
  name,
  championId,
  rankInfo,
  masteryInfo,
  runeInfo,
}) {
  const championData = getChampionById(championId);
  return (
    <div className={styles.participantContainer}>
      <div>
        <ChampionIcon
          height={75}
          width={75}
          image={championData.imageUrl}
          placeholder={championData.placeholderBase64}
          name={championData.name}
        />
        <div>{name}</div>
      </div>
      <div>
        <RankIcon
          rank={rankInfo.rank}
          tier={rankInfo.tier}
          height={65}
          width={57}
        />
        {rankInfo.lp} {rankInfo.lp && "lp"}
      </div>
      <div>
        <MasteryIcon masteryLevel={masteryInfo.level} height={52} width={51} />
        {masteryInfo.points}
      </div>
      <div className={styles.runeContainer}>
        {runeInfo.map((runeId, index) => {
          const heightWidth = index === 0 ? 75 : index < 4 ? 50 : 45;
          return (
            <RuneIcon
              key={runeId}
              runeId={runeId}
              height={heightWidth}
              width={heightWidth}
            />
          );
        })}
      </div>
    </div>
  );
}

ParticipantInfo.propTypes = {
  name: PropTypes.string,
  championId: PropTypes.number,
  rankInfo: PropTypes.shape({
    rank: PropTypes.string,
    tier: PropTypes.string,
    lp: PropTypes.number,
  }),
  masteryInfo: PropTypes.shape({
    level: PropTypes.number,
    points: PropTypes.number,
  }),
  runeInfo: PropTypes.arrayOf(PropTypes.number),
};

export default ParticipantInfo;
