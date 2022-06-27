import rankJson from "./ranks.json";

export function getRankByRank(rank) {
  return rankJson[rank];
}
