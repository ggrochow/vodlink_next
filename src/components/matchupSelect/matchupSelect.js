import PropTypes from "prop-types";
import styles from "./matchupSelect.module.scss";
import { matchupData } from "../../prop_type_shapes/vodlinkRow";
import MatchupDisplay from "./matchupDisplay";
import { useState } from "react";
import ChampionList from "../championList/championList";
import {
  dbRoleToLoLRole,
  dbRoleToMatchupUrlRole,
} from "../../../lol_data/roles";
import { fullSearchLink, titleCase } from "../../utils";

function MatchupSelect({ streamerRole, matchupData, counts }) {
  const [matchupRole, setMatchupRole] = useState(null);
  const urlBuilder = (key) => (value) => {
    const params = {
      streamerRole,
      allyTop: matchupData.allyTop,
      allyMiddle: matchupData.allyMid,
      allyBottom: matchupData.allyBot,
      allyJungle: matchupData.allyJungle,
      allyUtility: matchupData.allySupport,
      enemyTop: matchupData.enemyTop,
      enemyMiddle: matchupData.enemyMid,
      enemyBottom: matchupData.enemyBot,
      enemyJungle: matchupData.enemyJungle,
      enemyUtility: matchupData.enemySupport,
      page: 1,
    };
    params[key] = value;

    return fullSearchLink(params);
  };
  const handleChampionClick = (role) => {
    setMatchupRole(role);
  };
  const closeChampionList = () => setMatchupRole(null);
  let urlRole;
  let team;
  let role;
  if (matchupRole) {
    [team, role] = matchupRole.split("_");
    urlRole = dbRoleToMatchupUrlRole(role, team);
  }

  return (
    <div className={styles.container}>
      <MatchupDisplay
        urlBuilder={urlBuilder}
        streamerRole={streamerRole}
        matchupData={matchupData}
        onChampionClick={handleChampionClick}
      />

      {team && role && (
        <div>
          <p className={styles.matchupRole}>
            {titleCase(team)} {titleCase(dbRoleToLoLRole(role))}
          </p>
        </div>
      )}

      {matchupRole && (
        <ChampionList
          counts={counts[matchupRole]}
          linkGenerator={urlBuilder(urlRole)}
        />
      )}

      {matchupRole && (
        <div className={styles.closeContainer}>
          <button className={styles.closeButton} onClick={closeChampionList}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default MatchupSelect;

MatchupSelect.propTypes = {
  streamerRole: PropTypes.string,
  counts: PropTypes.object,
  matchupData: matchupData,
};
