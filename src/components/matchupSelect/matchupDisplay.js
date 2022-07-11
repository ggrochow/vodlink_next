import styles from "./matchupSelect.module.scss";
import { DB_ROLES } from "../../../lol_data/constants";
import { getRoleByDbRoleAndRank } from "../../../lol_data/roles";
import Link from "next/link";
import { RoleIcon } from "../icons/roleIcon";
import PropTypes from "prop-types";
import { matchupData } from "../../prop_type_shapes/vodlinkRow";
import TeamRow from "./teamRow";

function MatchupDisplay({
  matchupData,
  urlBuilder,
  streamerRole,
  onChampionClick,
}) {
  const selectedRoleRank = "DIAMOND";
  const defaultRoleRank = "IRON";
  const getRoleRank = (role) =>
    streamerRole === role ? selectedRoleRank : defaultRoleRank;

  return (
    <div className={styles.matchupContainer}>
      <TeamRow
        team={"ally"}
        matchupData={matchupData}
        urlBuilder={urlBuilder}
        onChampionClick={onChampionClick}
      />
      <div className={styles.roleRow}>
        {DB_ROLES.map((role) => {
          const roleData = getRoleByDbRoleAndRank(role, getRoleRank(role));
          // TODO include role counts somewhere
          return (
            <div key={role}>
              {role === streamerRole && (
                <>
                  <Link href={urlBuilder("streamerRole")(undefined)}>
                    <a>
                      <div className={styles.closeCircle}>&#10005;</div>
                    </a>
                  </Link>

                  <RoleIcon role={roleData} width={50} height={50} />
                </>
              )}
              {role !== streamerRole && (
                <Link href={urlBuilder("streamerRole")(role)}>
                  <a>
                    <RoleIcon role={roleData} width={50} height={50} />
                  </a>
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <TeamRow
        team={"enemy"}
        matchupData={matchupData}
        urlBuilder={urlBuilder}
        onChampionClick={onChampionClick}
      />
    </div>
  );
}

MatchupDisplay.propTypes = {
  matchupData: matchupData,
  urlBuilder: PropTypes.func.isRequired,
  streamerRole: PropTypes.string,
  onChampionClick: PropTypes.func.isRequired,
};
export default MatchupDisplay;
