"use client";

import { CalendarIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecentLoanApplications } from "@/hooks/subscriptions/use-recent-application";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  firstName: string;
  lastName: string;
  avatar: string;
  id: number;
  amount: number;
  purpose: string;
  status: "active" | "overdue" | "completed";
  created_at: string;
};

const RecentApplicationTable = ({
  recentLoanApplications,
}: {
  recentLoanApplications: Props[];
}) => {
  const router = useRouter();
  const { data = recentLoanApplications } = useRecentLoanApplications();

  const handleRowClick = (loanId: string) => {
    router.push(`/loans/details?id=${loanId}`);
  };

  return (
    <div className="space-y-4">
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
          {data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">LOAN-{item.id}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={item.avatar}
                    alt={`${item.firstName} ${item.lastName}`}
                  />
                  <AvatarFallback>
                    {getInitials(`${item.firstName} ${item.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell>{formatCurrency(item.amount)}</TableCell>
              <TableCell className="hidden md:table-cell capitalize">
                {item.purpose}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "text-xs capitalize rounded-full",
                    item.status === "active"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                      : item.status === "overdue"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center pt-4 border-t">
        <Button variant="link" asChild>
          <Link href="/loans" className="text-xs">
            View All Applications
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RecentApplicationTable;
