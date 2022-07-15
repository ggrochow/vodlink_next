import roleJson from "./roles.json";
import { titleCase } from "../src/utils";

export function dbRoleToLoLRole(dbRole) {
  switch (dbRole) {
    case "MIDDLE":
      return "MID";
    case "UTILITY":
      return "SUPPORT";
    case "BOTTOM":
      return "BOT";
    default:
      return dbRole;
  }
}

export function dbRoleToMatchupUrlRole(dbRole, team) {
  return `${team.toLowerCase()}${titleCase(dbRole)}`;
}

export function shortRoleToDbRole(shortRole) {
  switch (shortRole) {
    case "MID":
      return "MIDDLE";
    case "SUP":
      return "UTILITY";
    case "JG":
      return "JUNGLE";
    case "BOT":
      return "BOTTOM";
    case "TOP":
      return "TOP";
    default:
      return null;
  }
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

export const fullSearchParams = {
  allyTop: "ALLY_TOP",
  allyMiddle: "ALLY_MIDDLE",
  allyBottom: "ALLY_BOTTOM",
  allyJungle: "ALLY_JUNGLE",
  allyUtility: "ALLY_UTILITY",
  enemyTop: "ENEMY_TOP",
  enemyMiddle: "ENEMY_MIDDLE",
  enemyBottom: "ENEMY_BOTTOM",
  enemyJungle: "ENEMY_JUNGLE",
  enemyUtility: "ENEMY_UTILITY",
};

export const dbRoles = ["TOP", "JUNGLE", "MIDDLE", "UTILITY", "BOTTOM"];
export const shortRoles = ["MID", "SUP", "JG", "TOP", "BOT"];

export function getRoleByDbRole(dbRole) {
  return getRoleByRoleAndRank(dbRoleToLoLRole(dbRole), "CHALLENGER");
}

export function getRoleByDbRoleAndRank(dbRole, rank) {
  return getRoleByRoleAndRank(dbRoleToLoLRole(dbRole), rank);
}

export function getRoleByRoleAndRank(role, rank) {
  return roleJson[rank][role];
}
