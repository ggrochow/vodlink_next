import PropTypes from "prop-types";
import styles from "./vodlinkRow.module.scss";
import { dbRoles, getRoleByDbRoleAndRank } from "../../../lol_data/roles";
import { RoleIcon } from "../icons/roleIcon";
import TeamRow from "./teamRow";
import { useState } from "react";
import { participantShape } from "../../prop_type_shapes/vodlinkRow";
import ParticipantRow from "./participantRow";
import { matchHistoryLink } from "../../utils";
import dayjs from "dayjs";
import Link from "next/link";
import classnames from "classnames";
import { DB_ROLES } from "../../../lol_data/constants";

const byTeam = (teamId) => (participant) => participant.teamId === teamId;

function VodlinkRow({ vodlink, streamerRole }) {
  const streamers = vodlink.participants.filter((p) => p.vod);
  let streamer;
  if (dbRoles.includes(streamerRole)) {
    streamer = streamers.find((p) => p.role === streamerRole);
  } else {
    streamer = streamers[0];
  }

  const [selectedRole, setRole] = useState(streamer.role);
  const teamOne = vodlink.participants.filter(byTeam(streamer.teamId));
  const teamTwo = vodlink.participants.filter(
    byTeam(streamer.teamId === 100 ? 200 : 100)
  );
  const teamOneParticipant = teamOne.find((p) => p.role === selectedRole);
  const teamTwoParticipant = teamTwo.find((p) => p.role === selectedRole);

  const streamerRoles = streamers.map((p) => p.role);
  const matchStartDate = dayjs(vodlink.matchStartDate);
  const hoursSinceMatch = dayjs().diff(matchStartDate, "hours");
  const daysSinceMatch = dayjs().diff(matchStartDate, "days");
  const timeAgo =
    hoursSinceMatch < 24
      ? `${hoursSinceMatch}h ago`
      : `${daysSinceMatch} day${daysSinceMatch > 1 ? "s" : ""} ago`;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p suppressHydrationWarning={true}>{timeAgo}</p>
        <p>{vodlink.region.replace(/[0-9]/g, "")}</p>
        <Link href={matchHistoryLink(vodlink.nativeMatchId)}>
          <a target="_blank">
            <p>League of Graphs</p>
          </a>
        </Link>
      </div>
      <div className={styles.matchup}>
        <ParticipantRow participant={teamOneParticipant} />
        <TeamRow team={teamOne} selectedRole={selectedRole} />
        <div className={styles.roles}>
          {dbRoles.map((role) => {
            const roleRank =
              role === selectedRole
                ? "DIAMOND"
                : streamerRoles.includes(role)
                ? "GOLD"
                : "IRON";
            return (
              <button
                className={classnames({
                  [styles.selected]: role === selectedRole,
                })}
                key={role}
                onClick={() => setRole(role)}
              >
                <RoleIcon
                  role={getRoleByDbRoleAndRank(role, roleRank)}
                  height={75}
                  width={75}
                />
              </button>
            );
          })}
        </div>
        <TeamRow team={teamTwo} selectedRole={selectedRole} />
        <ParticipantRow participant={teamTwoParticipant} />
      </div>
    </div>
  );
}

VodlinkRow.propTypes = {
  vodlink: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nativeMatchId: PropTypes.string.isRequired,
    winningTeam: PropTypes.number,
    region: PropTypes.string,
    participants: PropTypes.arrayOf(participantShape),
  }).isRequired,
  streamerRole: PropTypes.oneOf([...DB_ROLES, "role"]),
};

export default VodlinkRow;
