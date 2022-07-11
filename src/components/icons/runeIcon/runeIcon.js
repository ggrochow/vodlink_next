import Image from "next/future/image";
import { getRuneById } from "../../../../lol_data/runes";
import PropTypes from "prop-types";

function RuneIcon({ runeId, height, width }) {
  const runeInfo = getRuneById(runeId);
  if (!runeInfo) {
    return null;
  }

  return (
    <Image
      alt={runeInfo.name}
      title={runeInfo.name}
      src={runeInfo.imageSrc}
      blurDataURL={runeInfo.imagePlaceholder}
      placeholder={"blur"}
      height={height}
      width={width}
    />
  );
}

RuneIcon.propTypes = {
  runeId: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default RuneIcon;
