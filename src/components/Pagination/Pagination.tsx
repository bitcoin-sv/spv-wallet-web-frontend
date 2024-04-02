import { PaginationButton, PaginationList, PaginationNav } from '@/components/Pagination/Pagination.styles';
import { FC } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  return (
    <PaginationNav>
      <PaginationList>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <PaginationButton
              variant="transparent"
              isActive={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationButton>
          </li>
        ))}
      </PaginationList>
    </PaginationNav>
  );
};
