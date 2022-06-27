import { matchHistoryLink, twitchVodLink } from "../../utils";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "./vodlinkRow.module.scss";
import { ParticipantInfo } from "./participantInfo";
import dayjs from "dayjs";

function VodlinkRow({ vodLink, streamerInfo, enemyInfo }) {
  if (!vodLink || !streamerInfo || !enemyInfo) {
    return null;
  }
  const difference = dayjs().diff(vodLink.timestamp, "hour");
  const hoursSince = `${difference % 24} hours`;
  const daysSince = Math.round(difference / 24);

  const timeSince =
    difference < 24
      ? hoursSince
      : `${daysSince} days ${difference % 24 ? hoursSince : ""}`;

  return (
    <div key={vodLink.id} className={styles.container}>
      <div className={styles.vodlinkContainer}>
        <Link href={twitchVodLink(vodLink.vodId, vodLink.offset)}>
          <a target="_blank">
            <p>VOD - {vodLink.channelName}</p>
          </a>
        </Link>
        <p title={`${vodLink.timestamp.format("MMM D YYYY")}`}>
          {timeSince} ago
        </p>
        <Link href={matchHistoryLink(vodLink.matchId)}>
          <a target="_blank">
            <p>History - LeagueOfGraphs</p>
          </a>
        </Link>
      </div>

      <div className={styles.matchupContainer}>
        <ParticipantInfo
          name={streamerInfo.name}
          championId={streamerInfo.championId}
          rankInfo={streamerInfo.rank}
          masteryInfo={streamerInfo.mastery}
          runeInfo={streamerInfo.runes}
        />
        <ParticipantInfo
          name={enemyInfo.name}
          championId={enemyInfo.championId}
          rankInfo={enemyInfo.rank}
          masteryInfo={enemyInfo.mastery}
          runeInfo={enemyInfo.runes}
        />
      </div>
    </div>
  );
}

VodlinkRow.propTypes = {
  vodLink: PropTypes.shape({
    id: PropTypes.number,
    vodId: PropTypes.string,
    offset: PropTypes.number,
    timestamp: PropTypes.instanceOf(dayjs),
    channelName: PropTypes.string,
    region: PropTypes.string,
    matchId: PropTypes.string,
  }),
  streamerInfo: PropTypes.shape({
    championId: PropTypes.number,
    name: PropTypes.string,
    rank: PropTypes.shape({
      rank: PropTypes.string,
      tier: PropTypes.string,
      lp: PropTypes.number,
    }),
    mastery: PropTypes.shape({
      level: PropTypes.number,
      points: PropTypes.number,
    }),
    runes: PropTypes.arrayOf(PropTypes.number),
  }),
  enemyInfo: PropTypes.shape({
    championId: PropTypes.number,
    name: PropTypes.string,
    summonerName: PropTypes.string,
    rank: PropTypes.shape({
      rank: PropTypes.string,
      tier: PropTypes.string,
      lp: PropTypes.number,
    }),
    mastery: PropTypes.shape({
      level: PropTypes.number,
      points: PropTypes.number,
    }),
    runes: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default VodlinkRow;
