import { useRouter } from "next/router";
import { fetchEnemyChampCounts } from "../../../src/external_apis/vodlink";
import PropTypes from "prop-types";
import championData from "../../../lol_data/champion.json";
import ChampionList from "../../../src/components/championList/championList";
import { SearchProgressLinks } from "../../../src/components/searchProgressLinks";
import { pageRevalidateTime } from "../../../src/constants";
import { fullSearchLink, titleCase } from "../../../src/utils";

function MatchupsByRoleAndChampion({ championCounts }) {
  const router = useRouter();
  const { role, championId } = router.query;
  const champion = championData[championId];
  const params = {
    streamerRole: role,
    [`ally${titleCase(role)}`]: champion.key,
  };
  const linkGenerator = (key) => {
    params[`enemy${titleCase(role)}`] = key;
    return fullSearchLink(params);
  };

  return (
    <div>
      <SearchProgressLinks role={role} championId={championId} />
      <ChampionList counts={championCounts} linkGenerator={linkGenerator} />
    </div>
  );
}

MatchupsByRoleAndChampion.propTypes = {
  championCounts: PropTypes.arrayOf(
    PropTypes.shape({
      champion_id: PropTypes.number,
      count: PropTypes.number,
    })
  ),
};

export async function getStaticProps({ params }) {
  const { role, championId } = params;
  const props = {
    error: null,
    championCounts: null,
  };
  try {
    const res = await fetchEnemyChampCounts(role, championId);
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
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default MatchupsByRoleAndChampion;
