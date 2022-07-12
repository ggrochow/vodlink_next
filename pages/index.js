import React from "react";
import { fetchVodlinksByFullMatchup } from "../src/external_apis/vodlink";
import { fullSearchLink } from "../src/utils";
import {
  VodlinkRow,
  vodlinkRowDataTransformer,
} from "../src/components/vodlinkRow";
import { MatchupSelect } from "../src/components/matchupSelect";
import { Pagination } from "../src/components/pagination";
import { Head } from "../src/components/head";
import { pageRevalidateTime } from "../src/constants";

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
        description={`Search through ${pagination.total} LoL games by matchup to find vods to help you improve.`}
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

export async function getStaticProps() {
  const props = {
    vodlinks: null,
    errors: null,
  };

  try {
    const vodlinkResults = await fetchVodlinksByFullMatchup({});

    props.vodlinks = vodlinkResults.data;
  } catch (error) {
    console.error(error);
    props.error = error.message;
  }

  return {
    props,
    revalidate: pageRevalidateTime,
  };
}

export default Index;
