import Image from "next/image";
import PropTypes from "prop-types";
import { getRankByRank } from "../../../../lol_data/ranks";
import { titleCase } from "../../../utils";

const noRankTiers = ["CHALLENGER", "GRANDMASTER", "MASTER"];
function RankIcon({ rank, tier, height, width }) {
  const rankData = getRankByRank(tier);
  if (!rankData) {
    return null;
  }

  const title = `${titleCase(tier)}${
    noRankTiers.includes(tier) ? "" : ` ${rank}`
  }`;
  return (
    <div style={{ height: `${height}px`, width: `${width}px` }}>
      <Image
        title={title}
        alt={title}
        src={rankData.imageSrc}
        placeholder={"blur"}
        blurDataURL={rankData.imagePlaceholder}
        height={height}
        width={width}
      />
    </div>
  );
}

RankIcon.propTypes = {
  tier: PropTypes.string,
  rank: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default RankIcon;
