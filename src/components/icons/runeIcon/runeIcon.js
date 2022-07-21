import Image from "next/future/image";
import { getRuneById } from "../../../../lol_data/runes";
import PropTypes from "prop-types";

function RuneIcon({ runeId, height, width, priority }) {
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
      placeholder={priority ? "empty" : "blur"}
      height={height}
      priority={priority}
      width={width}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}

RuneIcon.propTypes = {
  runeId: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  priority: PropTypes.bool,
};

RuneIcon.defaultProps = {
  priority: false,
};

export default RuneIcon;
