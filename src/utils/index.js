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
  let historyRegion = region.replace(/[0-9]/g, "").toLowerCase();
  if (historyRegion === "eun") {
    historyRegion = "eune";
  }

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

export const championIdKeys = {
  allyTop: "ALLY_TOP",
  allyMid: "ALLY_MIDDLE",
  allyBot: "ALLY_BOTTOM",
  allyJungle: "ALLY_JUNGLE",
  allySupport: "ALLY_UTILITY",
  enemyTop: "ENEMY_TOP",
  enemyMid: "ENEMY_MIDDLE",
  enemyBot: "ENEMY_BOTTOM",
  enemyJungle: "ENEMY_JUNGLE",
  enemySupport: "ENEMY_UTILITY",
};

export function apiMatchupParams(params, role) {
  const apiParams = {};

  for (let [key, apiKey] of Object.entries(championIdKeys)) {
    if (params[key]) {
      apiParams[apiKey] = params[key];
    }
  }

  if (role) {
    apiParams.ROLE = role;
  }

  return apiParams;
}

export function getFullMatchupCountParams(apiParams) {
  return Object.values(championIdKeys).map((apiRole) => {
    const matchupSearchParams = { ...apiParams, COUNT_ROLE: apiRole };
    const isStreamerRole =
      apiRole.slice(0, 4) === "ALLY" && apiRole.slice(5) === apiParams.ROLE;
    if (isStreamerRole) {
      // this search returns all possible champions in this role
      // therefore we can't also filter by it
      delete matchupSearchParams[apiRole];
    }
    delete matchupSearchParams.PAGE;

    return matchupSearchParams;
  });
}

export function mapMatchupCounts(countResponses) {
  const counts = {};
  for (let count of countResponses) {
    const countData = count.data;

    counts[countData.role] = countData.counts;
  }

  return counts;
}
