import React from "react";
import Link from "next/link";
import styles from "../styles/index.module.scss";
import { DB_ROLES } from "../lol_data/constants";
import { getRoleByDbRole } from "../lol_data/roles";
import { RoleIcon } from "../src/components/icons/roleIcon";
import ChampionList from "../src/components/championList/championList";
import { fullSearchLink } from "../src/utils";

function Index({ roleCounts, championCounts }) {
  return (
    <div>
      <div className={styles.roleContainer}>
        {DB_ROLES.map((role) => {
          const count = roleCounts?.find(
            (roleCount) => roleCount.role === role
          );
          const roleIcon = getRoleByDbRole(role);
          return (
            <div key={role} className={styles.roleIconContainer}>
              <Link href={fullSearchLink({ streamerRole: role })}>
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

Index.propTypex = {};

export async function getStaticProps() {
  const props = {
    roleCounts: [],
    errors: null,
  };

  return {
    props,
    revalidate: 60 * 60, // 1 hour
  };
}

export default Index;
