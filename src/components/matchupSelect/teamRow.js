import { DB_ROLES } from "../../../lol_data/constants";
import Link from "next/link";
import {
  dbRoleToLoLRole,
  dbRoleToMatchupUrlRole,
} from "../../../lol_data/roles";
import styles from "./matchupSelect.module.scss";
import { ChampionIconId } from "../icons/championIcon";
import { titleCase } from "../../utils";

const keyName = (role, team) =>
  `${team.toLowerCase()}${titleCase(dbRoleToLoLRole(role))}`;

function TeamRow({ matchupData, team, onChampionClick, urlBuilder }) {
  return (
    <div>
      {DB_ROLES.map((role) => {
        const key = keyName(role, team);
        const champId = matchupData[key];
        return (
          <div key={role}>
            {champId && (
              <Link
                href={urlBuilder(dbRoleToMatchupUrlRole(role, team))(undefined)}
              >
                <a className={styles.closeCircle}>
                  <div>&#10005;</div>
                </a>
              </Link>
            )}
            <button
              className={styles.championButton}
              onClick={() => onChampionClick(`${team.toUpperCase()}_${role}`)}
            >
              <ChampionIconId championId={champId} width={50} height={50} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default TeamRow;
