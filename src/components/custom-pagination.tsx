import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getPaginationPages } from "@/lib/utils";

export const PaginationComponent = ({
  page,
  totalItems,
  perPage,
  hasMore,
  onPageChange,
}: {
  page: number;
  totalItems: number;
  perPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const pages = getPaginationPages(page, totalPages);

  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href=""
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href=""
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p as number);
                }}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href=""
            onClick={(e) => {
              e.preventDefault();
              if (hasMore) onPageChange(page + 1);
            }}
            className={!hasMore ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
