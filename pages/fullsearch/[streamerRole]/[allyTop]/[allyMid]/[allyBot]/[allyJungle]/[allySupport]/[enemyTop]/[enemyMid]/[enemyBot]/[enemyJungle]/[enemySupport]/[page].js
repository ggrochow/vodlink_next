import PropTypes from "prop-types";
import { dbRoles } from "../../../../../../../../../../../../../lol_data/roles";
import {
  fetchChampCounts,
  fetchVodlinksByFullMatchup,
} from "../../../../../../../../../../../../../src/external_apis/vodlink";
import { pageRevalidateTime } from "../../../../../../../../../../../../../src/constants";
import { getChampionById } from "../../../../../../../../../../../../../lol_data/champions";
import { MatchupSelect } from "../../../../../../../../../../../../../src/components/matchupSelect";
import {
  VodlinkRow,
  vodlinkRowDataTransformer,
} from "../../../../../../../../../../../../../src/components/vodlinkRow";
import { Pagination } from "../../../../../../../../../../../../../src/components/pagination";
import {
  championIdKeys,
  fullSearchLink,
  getFullMatchupCountParams,
} from "../../../../../../../../../../../../../src/utils";
import { matchupData } from "../../../../../../../../../../../../../src/prop_type_shapes/vodlinkRow";

function FullSearch({ streamerRole, matchupData, vodlinks, page, counts }) {
  if (!vodlinks) {
    return null;
  }

  const searchUrlBuilder = (key) => (value) => {
    const params = {
      streamerRole,
      allyTop: matchupData.allyTop,
      allyMiddle: matchupData.allyMid,
      allyBottom: matchupData.allyBot,
      allyJungle: matchupData.allyJungle,
      allyUtility: matchupData.allySupport,
      enemyTop: matchupData.enemyTop,
      enemyMiddle: matchupData.enemyMid,
      enemyBottom: matchupData.enemyBot,
      enemyJungle: matchupData.enemyJungle,
      enemyUtility: matchupData.enemySupport,
      page,
    };
    params[key] = value;

    return fullSearchLink(params);
  };
  const paginationUrlBuilder = searchUrlBuilder("page");

  const { data, pagination } = vodlinks;
  return (
    <div>
      <MatchupSelect
        key={searchUrlBuilder()()}
        counts={counts}
        streamerRole={streamerRole}
        matchupData={matchupData}
      />

      {pagination && (
        <Pagination
          total={pagination.total}
          limit={pagination.limit}
          page={pagination.page}
          linkGenerator={paginationUrlBuilder}
        />
      )}

      {data?.map((vodlink) => {
        return (
          <VodlinkRow
            key={vodlink.native_match_id}
            vodlink={vodlinkRowDataTransformer(vodlink)}
          />
        );
      })}

      {pagination && (data?.length || 0) > 1 && (
        <Pagination
          total={pagination.total}
          limit={pagination.limit}
          page={pagination.page}
          linkGenerator={paginationUrlBuilder}
        />
      )}
    </div>
  );
}

FullSearch.propTypes = {
  streamerRole: PropTypes.string,
  matchupData: matchupData,
  page: PropTypes.number,
  vodlinks: PropTypes.shape({
    data: PropTypes.array,
    pagination: PropTypes.shape({
      total: PropTypes.number,
      page: PropTypes.number,
      limit: PropTypes.number,
    }),
  }),
};

export async function getStaticProps({ params }) {
  const props = {};
  const apiParams = {};

  if (isNaN(Number(params.page))) {
    return { notFound: true };
  }
  props.page = Number(params.page);
  if (props.page <= 0) {
    return { notFound: true };
  }
  apiParams.PAGE = props.page;

  const isDbRole = dbRoles.includes(params.streamerRole);
  if (!isDbRole && params.streamerRole !== "role") {
    return { notFound: true };
  }

  props.streamerRole = params.streamerRole;
  if (isDbRole) {
    apiParams.ROLE = params.streamerRole;
  }

  const matchupData = {};

  for (const [key, apiKey] of Object.entries(championIdKeys)) {
    const value = Number(params[key]);
    if (!isNaN(value)) {
      const championData = getChampionById(value);
      if (!championData) {
        return { notFound: true };
      }
      matchupData[key] = value;
      apiParams[apiKey] = value;
    }
  }

  props.matchupData = matchupData;

  try {
    const matchupCountSearches =
      getFullMatchupCountParams(apiParams).map(fetchChampCounts);
    const [vodlinkResponse, ...countResponses] = await Promise.all([
      fetchVodlinksByFullMatchup(apiParams),
      ...matchupCountSearches,
    ]);

    const counts = {};
    for (let count of countResponses) {
      const countData = count.data;
      counts[countData.role] = countData.counts;
    }

    props.vodlinks = vodlinkResponse.data;
    props.counts = counts;
  } catch (error) {
    props.error = error.message;
  }

  return {
    props,
    revalidate: pageRevalidateTime,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default FullSearch;