import { useRouter } from "next/router";
import { fetchVodlinksByMatchup } from "../../../../src/external_apis/vodlink";
import PropTypes from "prop-types";
import { SearchProgressLinks } from "../../../../src/components/searchProgressLinks";
import { VodlinkRowDataFixer } from "../../../../src/components/vodLinkRow";

function VodlinkResults({ vodLinks }) {
  const router = useRouter();
  const { role, championId, enemyChampionId } = router.query;

  return (
    <div>
      <SearchProgressLinks
        role={role}
        championId={championId}
        enemyChampionId={enemyChampionId}
      />
      <div>
        {vodLinks?.map((vodLink) => (
          <VodlinkRowDataFixer
            key={vodLink.id}
            role={role}
            rawVodlink={vodLink}
          />
        ))}
      </div>
    </div>
  );
}

VodlinkResults.propTypes = {
  vodLinks: PropTypes.arrayOf(PropTypes.object),
};

export async function getStaticProps({ params }) {
  const { role, championId, enemyChampionId } = params;
  const props = {
    error: null,
    vodLinks: null,
  };
  try {
    const res = await fetchVodlinksByMatchup(role, championId, enemyChampionId);
    props.vodLinks = res.data;
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

export default VodlinkResults;
