import PropTypes from "prop-types";
import {
  championIdKeys,
  dbRoles,
} from "../../../../../../../../../../../../../lol_data/roles";
import { fetchVodlinksByFullMatchup } from "../../../../../../../../../../../../../src/external_apis/vodlink";
import { getChampionById } from "../../../../../../../../../../../../../lol_data/champions";
import { MatchupSelect } from "../../../../../../../../../../../../../src/components/warnings/matchupSelect";
import {
  VodlinkRow,
  vodlinkRowDataTransformer,
} from "../../../../../../../../../../../../../src/components/vodlinkRow";
import { Pagination } from "../../../../../../../../../../../../../src/components/pagination";
import {
  cacheControlString,
  fullSearchLink,
  getMatchupDescriptionString,
} from "../../../../../../../../../../../../../src/utils";
import { matchupData } from "../../../../../../../../../../../../../src/prop_type_shapes/vodlinkRow";
import { Head } from "../../../../../../../../../../../../../src/components/head";
import React, { useMemo } from "react";
import { NoVodlinksText } from "../../../../../../../../../../../../../src/components/noVodlinksText";
import { InvalidPageText } from "../../../../../../../../../../../../../src/components/warnings/invalidPageText";
import { AddStreamersText } from "../../../../../../../../../../../../../src/components/warnings/addStreamersText";

function FullSearch({ streamerRole, matchupData, pagination, vodlinks, page }) {
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
  const descriptionString = useMemo(() => {
    return getMatchupDescriptionString(matchupData, streamerRole);
  }, [matchupData, streamerRole]);
  const invalidPage =
    pagination.total > 0 &&
    pagination.page > Math.ceil(pagination.total / pagination.limit);
  const emptyResults = vodlinks.length === 0;

  return (
    <div>
      <Head title="LoL VodFind" description={descriptionString} />
      <MatchupSelect
        key={searchUrlBuilder()()}
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
      {vodlinks?.map((vodlink, index) => {
        return (
          <VodlinkRow
            key={`${streamerRole}-${vodlink.nativeMatchId}`}
            vodlink={vodlink}
            streamerRole={streamerRole}
            priority={index === 0}
          />
        );
      })}

      {invalidPage && <InvalidPageText />}
      {!invalidPage && emptyResults && <NoVodlinksText />}
      {!invalidPage && vodlinks && pagination.total < 3 && <AddStreamersText />}
      {pagination && (vodlinks?.length || 0) >= 1 && (
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
  pagination: PropTypes.shape({
    total: PropTypes.number,
    page: PropTypes.number,
    limit: PropTypes.number,
  }),
  vodlinks: PropTypes.array,
};

export async function getServerSideProps({ params, res }) {
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
    const vodlinkResponse = await fetchVodlinksByFullMatchup(apiParams);
    props.vodlinks = vodlinkResponse.data.data.map(vodlinkRowDataTransformer);
    props.pagination = vodlinkResponse.data.pagination;

    res.setHeader("Cache-Control", cacheControlString());
  } catch (error) {
    console.error(JSON.stringify(error?.response?.data, null, 4));
    props.error = error.message;
  }

  return {
    props,
  };
}

export default FullSearch;
