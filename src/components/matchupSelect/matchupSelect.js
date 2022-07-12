import PropTypes from "prop-types";
import styles from "./matchupSelect.module.scss";
import { matchupData } from "../../prop_type_shapes/vodlinkRow";
import MatchupDisplay from "./matchupDisplay";
import { useEffect, useState } from "react";
import ChampionList from "../championList/championList";
import {
  dbRoleToLoLRole,
  dbRoleToMatchupUrlRole,
} from "../../../lol_data/roles";
import { apiMatchupParams, fullSearchLink, titleCase } from "../../utils";
import { fetchChampCounts } from "../../external_apis/vodlink";

function MatchupSelect({ streamerRole, matchupData }) {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({});
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
    if (role === matchupRole) {
      setMatchupRole(null);
    } else {
      setMatchupRole(role);
    }
  };
  const closeChampionList = () => setMatchupRole(null);

  useEffect(() => {
    if (!matchupRole || counts[matchupRole]) {
      return;
    }
    setLoading(true);
    const champCountParams = {
      ...apiMatchupParams(matchupData),
      COUNT_ROLE: matchupRole,
    };
    delete champCountParams.PAGE;

    fetchChampCounts(champCountParams)
      .then((response) => {
        setCounts((prevCounts) => {
          return { ...prevCounts, [matchupRole]: response.data.counts };
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setCounts((prevCounts) => {
          return { ...prevCounts, [matchupRole]: [] };
        });
      });
  }, [matchupRole, matchupData, counts]);

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
          linkGenerator={urlBuilder(urlRole)}
          counts={counts[matchupRole]}
          loading={loading}
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
