import { ChampionIcon } from "./index";
import { getChampionById } from "../../../../lol_data/champions";
import Image from "next/future/image";
import NoChampionIcon from "../../../../public/static/icons/no_champion.png";
import PropTypes from "prop-types";

function ChampionIconId({ championId, height, width, title }) {
  const champion = getChampionById(championId);
  if (!champion) {
    return (
      <Image
        title={title || "Select a champion"}
        alt="No Champion Icon"
        src={NoChampionIcon}
        height={height}
        width={width}
        placeholder={"blur"}
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
    />
  );
}

ChampionIconId.propTypes = {
  championId: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default ChampionIconId;
