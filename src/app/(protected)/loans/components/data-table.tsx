"use client";

import React from "react";
import { CalendarIcon, FileText } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LoanType } from "./loans-table-and-filter";
import { cn, formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaginationComponent } from "@/components/custom-pagination";

interface DataTableProps {
  searchTerm: string;
  statusFilter: string;
  page: number;
  loans: LoanType;
  hasMore: boolean;
  total: number;
}

export function DataTable({
  searchTerm,
  statusFilter,
  page,
  loans,
  hasMore,
  total,
}: DataTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleRowClick = (loanId: number) => {
    router.push(`/loans/details?id=${loanId}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    const pageParams = params.toString();

    router.push(`${pathname}?${pageParams ? `${pageParams}` : ""}`);
  };

  return (
    <React.Fragment>
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
          {loans.length === 0 ? (
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
            loans.map((loan) => (
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
                    <span>{formatDate(loan.created_at)}</span>
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
        </TableBody>
      </Table>

      <div
        className={cn(
          "pt-4 border-t flex items-center justify-end",
          (searchTerm || statusFilter !== "all") && "justify-between"
        )}
      >
        {(searchTerm || statusFilter !== "all") && (
          <div className="flex flex-wrap shrink-0 gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {searchTerm && (
              <Badge variant="outline" className="text-xs">
                Client: {searchTerm}
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="outline" className="text-xs capitalize">
                Status: {statusFilter}
              </Badge>
            )}
            {loans.length > 0 && (
              <Badge variant="outline" className="text-xs">
                Total: {loans.length}
              </Badge>
            )}
          </div>
        )}
        <PaginationComponent
          page={page}
          totalItems={total}
          perPage={10}
          hasMore={hasMore}
          onPageChange={handlePageChange}
        />
      </div>
    </React.Fragment>
  );
}
