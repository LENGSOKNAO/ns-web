"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const buttonClass =
    "flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm transition-colors";

  return (
    <nav
      aria-label="Product pagination"
      className="flex w-full items-center justify-between gap-2 border-t border-gray-200 pt-5"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonClass} gap-2 border border-gray-200 px-4 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <span aria-hidden="true">←</span>
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 min-w-6 items-center justify-center text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={`${buttonClass} ${
                currentPage === page
                  ? "bg-gray-100 text-black"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonClass} gap-2 border border-gray-200 px-4 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <span className="hidden sm:inline">Next</span>
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
