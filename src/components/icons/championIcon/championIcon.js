import React from "react";
import PropTypes from "prop-types";
import Image from "next/future/image";

function ChampionIcon({ name, placeholder, image, height, width, priority }) {
  return (
    <Image
      title={name}
      alt={name}
      src={image}
      height={height}
      width={width}
      placeholder={priority ? "empty" : "blur"}
      blurDataURL={placeholder}
      priority={priority}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}

ChampionIcon.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  priority: PropTypes.bool,
};

ChampionIcon.defaultProps = {
  priority: false,
};

export default ChampionIcon;
