import roleJson from "./roles.json";

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

export function getRoleByDbRole(dbRole) {
  return getRoleByRoleAndRank(dbRoleToLoLRole(dbRole), "CHALLENGER");
}

export function getRoleByDbRoleAndRank(dbRole, rank) {
  return getRoleByRoleAndRank(dbRoleToLoLRole(dbRole), rank);
}

export function getRoleByRoleAndRank(role, rank) {
  return roleJson[rank][role];
}
