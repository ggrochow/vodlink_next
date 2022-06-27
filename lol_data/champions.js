import championJson from "./champion.json";

export function getChampionById(id) {
  return championJson[id];
}
