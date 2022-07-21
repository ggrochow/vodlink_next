import styles from "./matchupSelect.module.scss";
import { DB_ROLES } from "../../../../lol_data/constants";
import { getRoleByDbRoleAndRank } from "../../../../lol_data/roles";
import Link from "next/link";
import { RoleIcon } from "../../icons/roleIcon";
import PropTypes from "prop-types";
import { matchupData } from "../../../prop_type_shapes/vodlinkRow";
import TeamRow from "./teamRow";
import { callBackIfExists } from "../../../utils";

function MatchupDisplay({
  matchupData,
  urlBuilder,
  streamerRole,
  onChampionClick,
  onRoleClick,
  onCloseClick,
}) {
  const selectedRoleRank = "DIAMOND";
  const defaultRoleRank = "IRON";
  const getRoleRank = (role) =>
    streamerRole === role ? selectedRoleRank : defaultRoleRank;

  const onRoleClickHandler = callBackIfExists(onRoleClick);
  const onCloseClickHandler = callBackIfExists(onCloseClick);

  return (
    <div className={styles.matchupContainer}>
      <TeamRow
        team={"ally"}
        matchupData={matchupData}
        urlBuilder={urlBuilder}
        onChampionClick={onChampionClick}
        onCloseClick={onCloseClickHandler}
      />
      <div className={styles.roleRow}>
        {DB_ROLES.map((role) => {
          const roleData = getRoleByDbRoleAndRank(role, getRoleRank(role));
          return (
            <div key={role}>
              {role === streamerRole && (
                <>
                  <Link href={urlBuilder("streamerRole")(undefined)}>
                    <a onClick={onRoleClickHandler}>
                      <div className={styles.closeCircle}>&#10005;</div>
                    </a>
                  </Link>

                  <RoleIcon
                    role={roleData}
                    width={50}
                    height={50}
                    priority={true}
                  />
                </>
              )}
              {role !== streamerRole && (
                <Link href={urlBuilder("streamerRole")(role)}>
                  <a onClick={onRoleClickHandler}>
                    <RoleIcon
                      role={roleData}
                      width={50}
                      height={50}
                      priority={true}
                    />
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
        onCloseClick={onCloseClickHandler}
      />
    </div>
  );
}

MatchupDisplay.propTypes = {
  matchupData: matchupData,
  urlBuilder: PropTypes.func.isRequired,
  streamerRole: PropTypes.string,
  onChampionClick: PropTypes.func.isRequired,
  onRoleClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};
export default MatchupDisplay;
