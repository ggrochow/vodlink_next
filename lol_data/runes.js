import runeJson from "./runes.json";

export function getRuneById(runeId) {
  return runeJson[runeId];
}
