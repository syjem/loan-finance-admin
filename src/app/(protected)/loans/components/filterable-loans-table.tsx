"use client";

import { CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LoanType } from "./all-loans-table";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@/hooks/use-infinite-query";

interface FilterableDealsTableProps {
  searchTerm: string;
  statusFilter: string;
  loans: LoanType;
}

export function FilterableDealsTable({
  searchTerm,
  statusFilter,
  loans,
}: FilterableDealsTableProps) {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLTableRowElement>(null);

  const { data, isLoading, isFetching, hasMore, fetchNextPage } =
    useInfiniteQuery({
      tableName: "all_loan_applications",
      columns: "*",
      pageSize: 10,
      trailingQuery: (query) => query.order("created_at", { ascending: false }),
      initialData: loans,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasMore, isFetching, fetchNextPage]);

  // Filter the deals based on search term and status
  const filteredLoans = data?.filter((loan) => {
    const matchesSearch =
      searchTerm === "" ||
      loan.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || loan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (loanId: number) => {
    router.push(`/loans/details?id=${loanId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Purpose</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLoans.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all"
                      ? "No loan applications match your filters."
                      : "No loan applications found."}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredLoans.map((loan) => (
              <TableRow
                key={loan.id}
                onClick={() => handleRowClick(loan.id)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">LOAN-{loan.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={loan.avatar}
                      alt={`${loan.firstName} ${loan.lastName}`}
                    />
                    <AvatarFallback>
                      {getInitials(`${loan.firstName} ${loan.lastName}`)}
                    </AvatarFallback>
                  </Avatar>
                  {loan.firstName} {loan.lastName}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {formatCurrency(loan.amount)}
                  </div>
                </TableCell>
                <TableCell className="capitalize hidden md:table-cell">
                  {loan.purpose} loan
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{format(loan.created_at, "MMM d, yyyy")}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "text-xs capitalize rounded-full",
                      loan.status === "active"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                        : loan.status === "overdue"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {loan.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
          {hasMore && (
            <TableRow ref={loadingRef}>
              <TableCell colSpan={6} className="h-24 text-center">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <span className="ml-2">Loading more...</span>
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
