import Image from "next/future/image";
import PropTypes from "prop-types";
import { getRankByRank } from "../../../../lol_data/ranks";
import { titleCase } from "../../../utils";

const noRankTiers = ["CHALLENGER", "GRANDMASTER", "MASTER"];
function RankIcon({ rank, tier, height, width, priority }) {
  const rankData = getRankByRank(tier);
  if (!rankData) {
    return null;
  }

  const title = `${titleCase(tier)}${
    noRankTiers.includes(tier) ? "" : ` ${rank}`
  }`;
  return (
    <Image
      title={title}
      alt={title}
      src={rankData.imageSrc}
      placeholder={priority ? "empty" : "blur"}
      blurDataURL={rankData.imagePlaceholder}
      height={height}
      width={width}
      priority={priority}
      style={{ aspectRatio: "512 / 585" }}
    />
  );
}

RankIcon.propTypes = {
  tier: PropTypes.string,
  rank: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  priority: PropTypes.bool,
};

RankIcon.defaultProps = {
  priority: false,
};

export default RankIcon;
