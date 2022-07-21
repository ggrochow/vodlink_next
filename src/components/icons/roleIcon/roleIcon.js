import PropTypes from "prop-types";
import Image from "next/future/image";
import { titleCase } from "../../../utils";

function RoleIcon({ role, height, width, priority }) {
  return (
    <Image
      title={titleCase(role.role)}
      alt={titleCase(role.role)}
      src={role.imageSrc}
      placeholder={priority ? "empty" : "blur"}
      blurDataURL={role.imagePlaceholder}
      height={height}
      width={width}
      priority={priority}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}

RoleIcon.propTypes = {
  role: PropTypes.shape({
    rank: PropTypes.string,
    role: PropTypes.string,
    imageSrc: PropTypes.string,
    imagePlaceholder: PropTypes.string,
  }),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  priority: PropTypes.bool,
};

RoleIcon.defaultProps = {
  priority: false,
};

export default RoleIcon;
