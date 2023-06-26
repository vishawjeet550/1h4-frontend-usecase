import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    if (totalPages > 5) {
      let displayedPages: (number | null)[] = [];
      if (currentPage <= 3) {
        displayedPages = [...pageNumbers.slice(0, 3), null, totalPages];
      } else if (currentPage >= totalPages - 2) {
        displayedPages = [1, null, ...pageNumbers.slice(totalPages - 3)];
      } else {
        displayedPages = [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages];
      }
      return displayedPages.map((page) => (
        <button
          key={page || 'ellipsis'}
          className={`pagination-item p-4 bg-blue ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page as number)}
          disabled={!page}
        >
          {page ? page : '...'}
        </button>
      ));
    }
    return pageNumbers.map((page) => (
      <button
        key={page}
        className={`pagination-item p-4 bg-blue ${page === currentPage ? 'active' : ''}`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    ));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </button>
      {renderPageNumbers()}
      <button
        className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
