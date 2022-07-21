import React from "react";
import { fetchVodlinksByFullMatchup } from "../src/external_apis/vodlink";
import { fullSearchLink, pageRevalidateTime } from "../src/utils";
import {
  VodlinkRow,
  vodlinkRowDataTransformer,
} from "../src/components/vodlinkRow";
import { MatchupSelect } from "../src/components/warnings/matchupSelect";
import { Pagination } from "../src/components/pagination";
import { Head } from "../src/components/head";
import { AddStreamersText } from "../src/components/warnings/addStreamersText";

function Index({ vodlinks, pagination }) {
  const searchUrlBuilder = (key) => (value) => {
    const params = {
      [key]: value,
    };

    return fullSearchLink(params);
  };
  const paginationUrlBuilder = searchUrlBuilder("page");

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

      {vodlinks?.map((vodlink, index) => {
        return (
          <VodlinkRow
            key={vodlink.nativeMatchId}
            vodlink={vodlink}
            priority={index === 0}
          />
        );
      })}

      <AddStreamersText />

      {pagination && (vodlinks?.length || 0) > 1 && (
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
    vodlinks: null,
    pagination: null,
    errors: null,
  };

  try {
    const vodlinkResults = await fetchVodlinksByFullMatchup({});
    props.vodlinks = vodlinkResults.data.data.map(vodlinkRowDataTransformer);
    props.pagination = vodlinkResults.data.pagination;
  } catch (error) {
    console.error(error);
    props.error = error.message;
  }

  return {
    revalidate: pageRevalidateTime(),
    props,
  };
}

export default Index;
