import React from "react";
import { fetchVodlinksByFullMatchup } from "../src/external_apis/vodlink";
import { cacheControlString, fullSearchLink } from "../src/utils";
import {
  VodlinkRow,
  vodlinkRowDataTransformer,
} from "../src/components/vodlinkRow";
import { MatchupSelect } from "../src/components/matchupSelect";
import { Pagination } from "../src/components/pagination";
import { Head } from "../src/components/head";

function Index({ vodlinks }) {
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
        description={`Search through ${pagination.total} League of Legends games by matchup to get links directly to twitch vods of those games being played.`}
      />
      <MatchupSelect key={searchUrlBuilder()()} matchupData={{}} />

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

export async function getServerSideProps({ res }) {
  const props = {
    vodlinks: null,
    errors: null,
  };

  try {
    const vodlinkResults = await fetchVodlinksByFullMatchup({});
    props.vodlinks = vodlinkResults.data;

    res.setHeader("Cache-Control", cacheControlString());
  } catch (error) {
    console.error(error);
    props.error = error.message;
  }

  return { props };
}

export default Index;
