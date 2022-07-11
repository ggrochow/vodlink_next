import lolData from "../../lol_data/champion.json";

export function championNameById(id) {
  return lolData[id]?.name;
}

export function twitchVodLink(vodId, secondsOffset) {
  const loadingOffset = 90; // Timestamps are at game load start, we skip ahead a little to prevent linking to load screens.
  const totalSeconds = secondsOffset + loadingOffset;

  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainderMinutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainderSeconds = totalSeconds % 60;

  let url = `https://www.twitch.tv/videos/${vodId}?t=`;
  if (totalHours > 0) {
    url += `${totalHours}h`;
  }
  if (remainderMinutes > 0) {
    url += `${remainderMinutes}m`;
  }
  url += `${remainderSeconds}s`;

  return url;
}

export function matchHistoryLink(rawId) {
  const [region, id] = rawId.split("_");
  const historyRegion = region.replace(/[0-9]/g, "").toLowerCase();

  // TODO fix eun -> eune, check others as well
  return `https://www.leagueofgraphs.com/match/${historyRegion}/${id}`;
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function fullSearchLink({
  streamerRole = "role",
  allyTop = "top",
  allyMiddle = "mid",
  allyBottom = "bot",
  allyJungle = "jg",
  allyUtility = "sup",
  enemyTop = "top",
  enemyMiddle = "mid",
  enemyBottom = "bot",
  enemyJungle = "jg",
  enemyUtility = "sup",
  page = 1,
}) {
  return `/fullsearch/${streamerRole}/${allyTop}/${allyMiddle}/${allyBottom}/${allyJungle}/${allyUtility}/${enemyTop}/${enemyMiddle}/${enemyBottom}/${enemyJungle}/${enemyUtility}/${page}`;
}
