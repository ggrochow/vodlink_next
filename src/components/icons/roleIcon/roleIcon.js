import PropTypes from "prop-types";
import Image from "next/image";

function RoleIcon({ role }) {
  return (
    <Image
      title={role.role}
      alt={role.role}
      src={role.imageSrc}
      placeholder={"blur"}
      blurDataURL={role.imagePlaceholder}
      height={72}
      width={72}
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
};

export default RoleIcon;
