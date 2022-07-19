import styles from "./vodlinkRow.module.scss";
import { participantShape } from "../../prop_type_shapes/vodlinkRow";
import { RankIcon } from "../icons/rankIcon";
import { MasteryIcon } from "../icons/masteryIcon";
import { RuneIcon } from "../icons/runeIcon";
import Link from "next/link";
import { largeNumberToReadableString, twitchVodLink } from "../../utils";
import Image from "next/future/image";
import TwitchIcon from "../../../public/static/icons/twitch.svg";

function ParticipantRow({ participant }) {
  if (!participant) {
    return null;
  }
  const { summonerName, rank, mastery, vod, channel, runes } = participant;
  return (
    <div className={styles.participant}>
      <div className={styles.participantName}>
        {!!vod && (
          <Link href={twitchVodLink(vod.nativeVodId, vod.offset)}>
            <a target="_blank" title="Watch Match">
              <Image
                src={TwitchIcon}
                height={25}
                width={25}
                alt={"Twitch Logo"}
                style={{ aspectRatio: "1/1" }}
              />
              {channel.displayName}{" "}
              {channel.displayName.toLowerCase() !==
                channel.channelName.toLowerCase() &&
                ` - ${channel.channelName}`}
            </a>
          </Link>
        )}
        {!vod && summonerName}
      </div>
      <div className={styles.participantRank}>
        <RankIcon width={65} height={75} rank={rank.rank} tier={rank.tier} />
        {rank.lp !== undefined && <span>{rank.lp}&nbsp;lp</span>}
      </div>
      <div className={styles.participantMastery}>
        <MasteryIcon width={75} height={75} masteryLevel={mastery.level} />
        <span title={mastery.points}>
          {largeNumberToReadableString(mastery.points)}
        </span>
      </div>
      <div className={styles.participantRunes}>
        <div>
          <RuneIcon runeId={runes[0]} width={75} height={75} />
        </div>
        <div>
          <RuneIcon runeId={runes[1]} width={40} height={40} />
          <RuneIcon runeId={runes[2]} width={40} height={40} />
          <RuneIcon runeId={runes[3]} width={40} height={40} />
        </div>
        <div>
          <RuneIcon runeId={runes[4]} width={40} height={40} />
          <RuneIcon runeId={runes[5]} width={40} height={40} />
        </div>
      </div>
    </div>
  );
}

ParticipantRow.propTypes = {
  participant: participantShape,
};

export default ParticipantRow;
