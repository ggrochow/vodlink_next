import VodlinkRow from "./vodlinkRow";
import dayjs from "dayjs";
function VodlinkRowDataFixer({ rawVodlink, role }) {
  const vodlinkRole = role.toLowerCase();
  const vodLink = {
    id: rawVodlink.id,
    vodId: rawVodlink.vod_id,
    offset: rawVodlink.vod_offset_seconds,
    timestamp: dayjs(rawVodlink.match_timestamp),
    channelName: rawVodlink.streamer_name,
    region: rawVodlink.match_region,
    matchId: rawVodlink.native_match_id,
  };
  const streamer = {
    championId: rawVodlink.streamer_champion,
    name: rawVodlink.summoner_name,
    rank: {
      tier: rawVodlink.streamer_rank_tier,
      rank: rawVodlink.streamer_rank_rank,
      lp: rawVodlink.streamer_rank_lp,
    },
    mastery: {
      level: rawVodlink.streamer_mastery_level,
      points: rawVodlink.streamer_mastery_points,
    },
    runes: [
      rawVodlink.streamer_rune_1,
      rawVodlink.streamer_rune_2,
      rawVodlink.streamer_rune_3,
      rawVodlink.streamer_rune_4,
      rawVodlink.streamer_rune_5,
      rawVodlink.streamer_rune_6,
    ],
  };
  const enemy = {
    championId: rawVodlink[`enemy_${vodlinkRole}_champion`],
    name: rawVodlink[`enemy_${vodlinkRole}_summoner_name`],
    rank: {
      tier: rawVodlink[`enemy_${vodlinkRole}_rank_tier`],
      rank: rawVodlink[`enemy_${vodlinkRole}_rank_rank`],
      lp: rawVodlink[`enemy_${vodlinkRole}_rank_lp`],
    },
    mastery: {
      level: rawVodlink[`enemy_${vodlinkRole}_mastery_level`],
      points: rawVodlink[`enemy_${vodlinkRole}_mastery_points`],
    },
    runes: [
      rawVodlink[`enemy_${vodlinkRole}_rune_1`],
      rawVodlink[`enemy_${vodlinkRole}_rune_2`],
      rawVodlink[`enemy_${vodlinkRole}_rune_3`],
      rawVodlink[`enemy_${vodlinkRole}_rune_4`],
      rawVodlink[`enemy_${vodlinkRole}_rune_5`],
      rawVodlink[`enemy_${vodlinkRole}_rune_6`],
    ],
  };
  return (
    <VodlinkRow vodLink={vodLink} streamerInfo={streamer} enemyInfo={enemy} />
  );
}

export default VodlinkRowDataFixer;
