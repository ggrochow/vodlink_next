import PropTypes from "prop-types";
import Link from "next/link";
import { championNameById, titleCase } from "../../utils";
import { dbRoleToLoLRole } from "../../../lol_data/roles";

function SearchProgressLinks({ role, championId, enemyChampionId }) {
  return (
    <div>
      {role && (
        <Link href="/">
          <a>{titleCase(dbRoleToLoLRole(role))} </a>
        </Link>
      )}
      {championId && (
        <Link href={`/search/${role}`}>
          <a>{championNameById(championId)}</a>
        </Link>
      )}
      {championId && " vs "}
      {enemyChampionId && (
        <Link href={`/search/${role}/${championId}`}>
          <a>{championNameById(enemyChampionId)}</a>
        </Link>
      )}
    </div>
  );
}

SearchProgressLinks.propTypes = {
  role: PropTypes.string,
  championId: PropTypes.string,
  enemyChampionId: PropTypes.string,
};

export default SearchProgressLinks;
