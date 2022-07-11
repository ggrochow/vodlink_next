import PropTypes from "prop-types";

export const participantShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  teamId: PropTypes.number.isRequired,
  championId: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  summonerName: PropTypes.string.isRequired,
  runes: PropTypes.arrayOf(PropTypes.number).isRequired,
  rank: PropTypes.shape({
    tier: PropTypes.string,
    rank: PropTypes.string,
    lp: PropTypes.number,
  }),
  mastery: PropTypes.shape({
    level: PropTypes.number,
    points: PropTypes.number,
  }),
  vod: PropTypes.shape({
    nativeVodId: PropTypes.string,
    offset: PropTypes.number,
  }),
  channel: PropTypes.shape({
    channelName: PropTypes.string,
    displayName: PropTypes.string,
  }),
});

export const matchupData = PropTypes.shape({
  allyTop: PropTypes.number,
  allyMid: PropTypes.number,
  allyBot: PropTypes.number,
  allyJungle: PropTypes.number,
  allySupport: PropTypes.number,
  enemyTop: PropTypes.number,
  enemyMid: PropTypes.number,
  enemyBot: PropTypes.number,
  enemyJungle: PropTypes.number,
  enemySupport: PropTypes.number,
});
