import { useRouter } from "next/router";
import { fetchEnemyChampCounts } from "../../../src/external_apis/vodlink";
import PropTypes from "prop-types";
import championData from "../../../lol_data/champion.json";
import ChampionList from "../../../src/components/championList/championList";
import { SearchProgressLinks } from "../../../src/components/searchProgressLinks";

function MatchupsByRoleAndChampion({ championCounts }) {
  const router = useRouter();
  const { role, championId } = router.query;
  const champion = championData[championId];
  const linkGenerator = (enemyChampion) =>
    `/search/${role}/${champion.key}/${enemyChampion.key}`;

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
    revalidate: 60 * 60,
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default MatchupsByRoleAndChampion;
