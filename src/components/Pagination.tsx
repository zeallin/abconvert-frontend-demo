"use client";

import { PosterSearchFilters } from "@/services/posterService";
import { QueryParamHelper } from "@/utils/queryParamHelper";
import { useRouter } from "next/navigation";

interface PaginationProps {
  pageNo: number;
  pageCount: number;
  //   onPageChange?: (pageNo: number) => void;
  pageUrl: string;
  searchFilter: PosterSearchFilters;
}

const maxVisiblePages = 5;

export const Pagination = ({
  pageNo = 1,
  pageCount = 5,
  pageUrl,
  searchFilter = {},
}: //   onPageChange,
PaginationProps) => {
  const router = useRouter();

  const handlePageRoute = (pageNo: number, pageUrl: string) => {
    const urlWithParam = QueryParamHelper.getPosterSearchUrl(pageUrl, {
      ...searchFilter,
      pageNo,
    });
    router.push(urlWithParam);
  };

  const handlePrevious = () => {
    if (pageNo > 1) {
      const navPageNo = pageNo - 1;
      handlePageRoute(navPageNo, pageUrl);
    }
    // if (onPageChange && pageNo > 1) {
    //   onPageChange(pageNo - 1);
    // }
  };

  const handleNext = () => {
    if (pageNo < pageCount) {
      const navPageNo = pageNo + 1;
      handlePageRoute(navPageNo, pageUrl);
    }
    // if (onPageChange && pageNo < pageCount) {
    //   onPageChange(pageNo + 1);
    // }
  };

  const handlePageClick = (page: number) => {
    handlePageRoute(page, pageUrl);
    // if (!onPageChange) onPageChange(page);
  };

  // Calculate which pages to display
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(2, pageNo - half);
    let endPage = Math.min(pageCount - 1, pageNo + half);

    // Adjust start and end to always show maxVisiblePages if possible
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (pageNo <= half + 1) {
        endPage = Math.min(pageCount - 1, maxVisiblePages + 1);
      } else {
        startPage = Math.max(2, pageCount - maxVisiblePages);
      }
    }

    // Add first page
    pages.push(1);

    // Add ellipsis if needed before the range
    if (startPage > 2) {
      pages.push("...");
    }

    // Add page range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed after the range
    if (endPage < pageCount - 1) {
      pages.push("...");
    }

    // Add last page if not already included
    if (pageCount > 1) {
      pages.push(pageCount);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center text-lg space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={pageNo === 1}
        className={`text-gold-800 bg-gold hover:bg-gold-400 hover:text-gold-700 font-medium   px-4 py-2 ${
          pageNo === 1 ? "opacity-50" : ""
        }`}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-gold-500"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page as number)}
            className={` bg-gold hover:bg-gold-400 hover:text-gold-700 px-4 py-2 ${
              pageNo === page
                ? "text-gold-800 bg-gold"
                : "bg-gold/0 border-1 border-gold text-gold-400"
            }`}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={handleNext}
        disabled={pageNo === pageCount}
        className={`text-gold-800 bg-gold hover:bg-gold-400 hover:text-gold-700 font-medium  px-4 py-2 ${
          pageNo === pageCount ? "opacity-50 " : ""
        }`}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
