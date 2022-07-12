import React from "react";
import {
  fetchChampCounts,
  fetchVodlinksByFullMatchup,
} from "../src/external_apis/vodlink";
import {
  fullSearchLink,
  getFullMatchupCountParams,
  mapMatchupCounts,
} from "../src/utils";
import {
  VodlinkRow,
  vodlinkRowDataTransformer,
} from "../src/components/vodlinkRow";
import { MatchupSelect } from "../src/components/matchupSelect";
import { Pagination } from "../src/components/pagination";
import { Head } from "../src/components/head";

function Index({ counts, vodlinks }) {
  const searchUrlBuilder = (key) => (value) => {
    const params = {
      [key]: value,
    };

    return fullSearchLink(params);
  };
  const paginationUrlBuilder = searchUrlBuilder("page");

  const { pagination, data } = vodlinks;
  return (
    <div>
      <Head
        title="LoL VodFind"
        description={`Search through ${pagination.total} LoL games by matchup to find vods to help you improve.`}
      />
      <MatchupSelect
        key={searchUrlBuilder()()}
        counts={counts}
        matchupData={{}}
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

export async function getStaticProps() {
  const props = {
    counts: [],
    vodlinks: null,
    errors: null,
  };

  try {
    const matchupCountSearches = getFullMatchupCountParams({}).map(
      fetchChampCounts
    );
    const [vodlinkResults, ...matchupCountResults] = await Promise.all([
      fetchVodlinksByFullMatchup({}),
      ...matchupCountSearches,
    ]);

    props.vodlinks = vodlinkResults.data;
    props.counts = mapMatchupCounts(matchupCountResults);
  } catch (error) {
    console.error(error);
    props.error = error.message;
  }

  return {
    props,
    revalidate: 60 * 60, // 1 hour
  };
}

export default Index;
