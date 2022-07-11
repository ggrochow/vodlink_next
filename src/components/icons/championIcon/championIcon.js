import React from "react";
import PropTypes from "prop-types";
import Image from "next/future/image";

function ChampionIcon({ name, placeholder, image, height, width }) {
  return (
    <Image
      title={name}
      alt={name}
      src={image}
      height={height}
      width={width}
      placeholder={"blur"}
      blurDataURL={placeholder}
    />
  );
}

ChampionIcon.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default ChampionIcon;
