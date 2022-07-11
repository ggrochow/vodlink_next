import Image from "next/future/image";
import Mastery1 from "../../../../public/static/mastery/mastery-1.png";
import Mastery2 from "../../../../public/static/mastery/mastery-2.png";
import Mastery3 from "../../../../public/static/mastery/mastery-3.png";
import Mastery4 from "../../../../public/static/mastery/mastery-4.png";
import Mastery5 from "../../../../public/static/mastery/mastery-5.png";
import Mastery6 from "../../../../public/static/mastery/mastery-6.png";
import Mastery7 from "../../../../public/static/mastery/mastery-7.png";
import PropTypes from "prop-types";

function getMasteryImg(masteryLevel) {
  switch (masteryLevel) {
    case 1:
      return Mastery1;
    case 2:
      return Mastery2;
    case 3:
      return Mastery3;
    case 4:
      return Mastery4;
    case 5:
      return Mastery5;
    case 6:
      return Mastery6;
    case 7:
      return Mastery7;
  }
}

function MasteryIcon({ masteryLevel, height, width }) {
  const title = `Mastery ${masteryLevel}`;
  const image = getMasteryImg(masteryLevel);
  if (!image) {
    return null;
  }

  return (
    <Image
      title={title}
      alt={title}
      height={height}
      width={width}
      src={getMasteryImg(masteryLevel)}
      placeholder={"blur"}
    />
  );
}

MasteryIcon.propTypes = {
  masteryLevel: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default MasteryIcon;
