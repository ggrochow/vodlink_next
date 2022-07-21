import { ChampionIcon } from "./index";
import { getChampionById } from "../../../../lol_data/champions";
import Image from "next/future/image";
import NoChampionIcon from "../../../../public/static/icons/no_champion.png";
import PropTypes from "prop-types";

function ChampionIconId({ championId, height, width, title, priority }) {
  const champion = getChampionById(championId);
  if (!champion) {
    return (
      <Image
        title={title || "Select a champion"}
        alt="No Champion Icon"
        src={NoChampionIcon}
        height={height}
        width={width}
        placeholder={priority ? "empty" : "blur"}
        priority={priority}
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    );
  }

  return (
    <ChampionIcon
      image={champion.imageUrl}
      placeholder={champion.placeholderBase64}
      height={height}
      name={title || champion.name}
      width={width}
      priority={priority}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}

ChampionIconId.propTypes = {
  championId: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  title: PropTypes.string,
  priority: PropTypes.bool,
};

ChampionIconId.defaultProps = {
  priority: false,
};

export default ChampionIconId;
