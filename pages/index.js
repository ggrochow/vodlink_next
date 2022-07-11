import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/index.module.scss";
import {
  fetchChampCounts,
  fetchRoleCounts,
} from "../src/external_apis/vodlink";
import { DB_ROLES } from "../lol_data/constants";
import { getRoleByDbRole } from "../lol_data/roles";
import { RoleIcon } from "../src/components/icons/roleIcon";
import { SearchProgressLinks } from "../src/components/searchProgressLinks";
import ChampionList from "../src/components/championList/championList";

function Index({ roleCounts, championCounts }) {
  return (
    <div>
      <SearchProgressLinks />
      <div className={styles.roleContainer}>
        {DB_ROLES.map((role) => {
          const count = roleCounts?.find(
            (roleCount) => roleCount.role === role
          );
          const roleIcon = getRoleByDbRole(role);
          return (
            <div key={role} className={styles.roleIconContainer}>
              <Link href={`/search/${role}`}>
                <a>
                  <RoleIcon role={roleIcon} height={72} width={72} />
                  {count?.count}
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <p>roles - {roleCounts?.reduce((acc, val) => acc + val.count, 0)}</p>
      <div>
        <p>
          champs - {championCounts?.reduce((acc, val) => acc + val.count, 0)}
        </p>
        <ChampionList linkGenerator={() => "#"} counts={championCounts} />
      </div>
    </div>
  );
}

Index.propTypex = {
  roleCounts: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      count: PropTypes.number,
    })
  ),
  champCounts: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      count: PropTypes.number,
    })
  ),
};

export async function getStaticProps() {
  const props = {
    roleCounts: [],
    errors: null,
  };
  try {
    const roleCountsRes = await fetchRoleCounts();
    const champCountsRes = await fetchChampCounts();

    props.roleCounts = roleCountsRes.data;
    props.championCounts = champCountsRes.data;
  } catch (error) {
    props.errors = error.message;
  }

  return {
    props,
    revalidate: 60 * 60, // 1 hour
  };
}

export default Index;
