import PropTypes from "prop-types";
import styles from "./pagination.module.scss";
import Link from "next/link";

function Pagination({ total, limit, page, linkGenerator }) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = page < 1 ? 1 : page > totalPages ? totalPages : page;
  const previousPage = currentPage === 1 ? 1 : currentPage - 1;
  const nextPage = currentPage === totalPages ? totalPages : currentPage + 1;
  const firstArrow = "<-";
  const prevArrow = " < ";
  const nextArrow = " > ";
  const lastArrow = "->";

  // 1 / 5
  return (
    <div className={styles.container}>
      {page === 1 && <span className={styles.disabled}>{firstArrow}</span>}
      {page !== 1 && (
        <Link href={linkGenerator(1)}>
          <a>{firstArrow}</a>
        </Link>
      )}

      {previousPage === page && (
        <span className={styles.disabled}>{prevArrow}</span>
      )}
      {previousPage !== page && (
        <Link href={linkGenerator(previousPage)}>
          <a>{prevArrow}</a>
        </Link>
      )}

      <span>
        Page {page} / {totalPages}
      </span>

      {nextPage === page && (
        <span className={styles.disabled}>{nextArrow}</span>
      )}
      {nextPage !== page && (
        <Link href={linkGenerator(nextPage)}>
          <a>{nextArrow}</a>
        </Link>
      )}

      {totalPages === page && (
        <span className={styles.disabled}>{lastArrow}</span>
      )}
      {totalPages !== page && (
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
