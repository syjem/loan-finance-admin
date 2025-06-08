"use client";

import { CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
import { useLoans } from "@/hooks/subscriptions/use-loans";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState(loans);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLTableRowElement>(null);
  const { data, error, isLoading, hasMore } = useLoans(page);

  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => [...prev, ...data.data]);
    }
  }, [data?.data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading]);

  // Filter the deals based on search term and status
  const filteredLoans = allData
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

  if (error) {
    return <div className="text-red-500">Error loading loans</div>;
  }

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
          {filteredLoans.map((loan) => (
            <TableRow
              key={loan.id}
              onClick={() => handleRowClick(loan.id)}
              className="cursor-pointer"
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
              <TableCell>{formatCurrency(loan.amount)}</TableCell>
              <TableCell className="hidden md:table-cell capitalize">
                {loan.purpose}
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
          ))}
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
