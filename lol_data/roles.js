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
