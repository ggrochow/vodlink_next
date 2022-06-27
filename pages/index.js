import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/index.module.scss";
import { fetchRoleCounts } from "../src/external_apis/vodlink";
import { DB_ROLES } from "../lol_data/constants";
import { getRoleByDbRole } from "../lol_data/roles";
import { RoleIcon } from "../src/components/icons/roleIcon";
import { SearchProgressLinks } from "../src/components/searchProgressLinks";

function Index({ roleCounts }) {
  return (
    <div>
      <SearchProgressLinks />
      <div className={styles.roleContainer}>
        {DB_ROLES.map((role) => {
          const count = roleCounts.find((roleCount) => roleCount.role === role);
          const roleIcon = getRoleByDbRole(role);
          return (
            <div key={role} className={styles.roleIconContainer}>
              <Link href={`/search/${role}`}>
                <a>
                  <RoleIcon role={roleIcon} />
                  {count.count}
                </a>
              </Link>
            </div>
          );
        })}
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
};

export async function getStaticProps() {
  const props = {
    roleCounts: [],
    errors: null,
  };
  try {
    const res = await fetchRoleCounts();
    props.roleCounts = res.data;
  } catch (error) {
    props.errors = error.message;
  }

  return {
    props,
    revalidate: 60 * 60, // 1 hour
  };
}

export default Index;
