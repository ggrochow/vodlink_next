import lolData from "../../lol_data/champion.json";

export function championNameById(id) {
  return lolData[id]?.name;
}

export function twitchVodLink(vodId, secondsOffset) {
  // TODO: make more human readable timestamps using hour/minute
  let loadingOffset = 90; // Timestamps are at game load start, we skip ahead a little to prevent linking to load screens.

  return `https://www.twitch.tv/videos/${vodId}?t=${
    secondsOffset + loadingOffset
  }s`;
}

export function matchHistoryLink(rawId) {
  const [region, id] = rawId.split("_");
  const historyRegion = region.replace(/[0-9]/g, "").toLowerCase();

  return `https://www.leagueofgraphs.com/match/${historyRegion}/${id}`;
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
