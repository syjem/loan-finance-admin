"use client";

import { CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AllLoans } from "./all-loans-table";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FilterableDealsTableProps {
  searchTerm: string;
  statusFilter: string;
  loans: AllLoans;
}

export function FilterableDealsTable({
  searchTerm,
  statusFilter,
  loans,
}: FilterableDealsTableProps) {
  const router = useRouter();

  // Filter the deals based on search term and status
  const filteredLoans = loans
    .filter((loan) => {
      const matchesSearch =
        searchTerm === "" ||
        loan.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.lastName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => b.id - a.id);

  const handleRowClick = (loanId: number) => {
    router.push(`/loans/details?id=${loanId}`);
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <Table className="rounded-md">
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
        </TableBody>
      </Table>

      {/* Filter summary */}
      {(searchTerm || statusFilter !== "all") && (
        <div className="flex flex-wrap shrink-0 gap-2 pt-4 border-t">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="outline" className="text-xs">
              Search: {searchTerm}
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="outline" className="text-xs capitalize">
              Status: {statusFilter}
            </Badge>
          )}
          {filteredLoans.length > 0 && (
            <Badge variant="outline" className="text-xs">
              Total: {filteredLoans.length}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
