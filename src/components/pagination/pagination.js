import PropTypes from "prop-types";
import styles from "./pagination.module.scss";
import Link from "next/link";

function Pagination({ total, limit, page, linkGenerator }) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = page < 1 ? 1 : page > totalPages ? totalPages : page;
  const previousPage = currentPage === 1 ? 1 : page - 1;
  const nextPage = currentPage === totalPages ? totalPages : page + 1;

  const showFirst = totalPages > 1 && page > 1;
  const showPrev = totalPages > 1 && previousPage < page;
  const showNext = totalPages > 1 && nextPage > page;
  const showLast = totalPages > 1 && totalPages > page;

  const firstArrow = "<-";
  const prevArrow = " < ";
  const nextArrow = " > ";
  const lastArrow = "->";

  // 1 / 5
  return (
    <div className={styles.container}>
      {!showFirst && <span className={styles.disabled}>{firstArrow}</span>}
      {showFirst && (
        <Link href={linkGenerator(1)}>
          <a>{firstArrow}</a>
        </Link>
      )}

      {!showPrev && <span className={styles.disabled}>{prevArrow}</span>}
      {showPrev && (
        <Link href={linkGenerator(previousPage)}>
          <a>{prevArrow}</a>
        </Link>
      )}

      <span>
        Page {page} / {totalPages}
      </span>

      {!showNext && <span className={styles.disabled}>{nextArrow}</span>}
      {showNext && (
        <Link href={linkGenerator(nextPage)}>
          <a>{nextArrow}</a>
        </Link>
      )}

      {!showLast && <span className={styles.disabled}>{lastArrow}</span>}
      {showLast && (
        <Link href={linkGenerator(totalPages)}>
          <a>{lastArrow}</a>
        </Link>
      )}
    </div>
  );
}

Pagination.propTypes = {
  linkGenerator: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default Pagination;
