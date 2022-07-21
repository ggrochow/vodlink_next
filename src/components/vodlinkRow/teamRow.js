import styles from "./vodlinkRow.module.scss";
import { dbRoles } from "../../../lol_data/roles";
import { ChampionIconId } from "../icons/championIcon";
import PropTypes from "prop-types";
import { participantShape } from "../../prop_type_shapes/vodlinkRow";

function TeamRow({ team, selectedRole, priority }) {
  return (
    <div className={styles.team}>
      {dbRoles.map((role) => {
        const participant = team.find((p) => p.role === role);
        return (
          <div
            className={selectedRole === role ? styles.active : ""}
            key={participant?.id}
          >
            <ChampionIconId
              championId={participant?.championId}
              height={75}
              width={75}
              priority={priority}
            />
          </div>
        );
      })}
    </div>
  );
}

TeamRow.propTypes = {
  team: PropTypes.arrayOf(participantShape).isRequired,
  selectedRole: PropTypes.string,
  priority: PropTypes.bool,
};

export default TeamRow;
