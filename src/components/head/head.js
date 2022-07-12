import NextHead from "next/head";
import PropTypes from "prop-types";

function Head({ title, description }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta property="og:type" content="website" />
      {description && <meta name="description" content={description} />}
      {description && <meta name="og:description" content={description} />}
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Head;
