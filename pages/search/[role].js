import React from "react";
import PropTypes from "prop-types";
import { fetchChampCounts } from "../../src/external_apis/vodlink";
import { DB_ROLES } from "../../lol_data/constants";
import ChampionList from "../../src/components/championList/championList";
import { useRouter } from "next/router";
import { SearchProgressLinks } from "../../src/components/searchProgressLinks";
import { pageRevalidateTime } from "../../src/constants";

function MatchupsByLane({ championCounts }) {
  const router = useRouter();
  const { role } = router.query;
  const linkGenerator = (key) => `/search/${role}/${key}`;
  return (
    <div>
      <SearchProgressLinks role={role} />
      <ChampionList counts={championCounts} linkGenerator={linkGenerator} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { role } = params;
  const props = {
    error: null,
    championCounts: null,
  };
  try {
    const res = await fetchChampCounts(role);
    props.championCounts = res.data;
  } catch (error) {
    props.error = error.message;
  }

  return {
    props,
    revalidate: pageRevalidateTime,
  };
}

export function getStaticPaths() {
  const paths = DB_ROLES.map((role) => {
    return {
      params: { role },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

MatchupsByLane.propTypes = {
  championCounts: PropTypes.arrayOf(
    PropTypes.shape({
      champion_id: PropTypes.number,
      count: PropTypes.number,
    })
  ),
};

export default MatchupsByLane;
