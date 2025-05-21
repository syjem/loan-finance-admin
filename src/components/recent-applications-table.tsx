"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecentLoanApplications } from "@/hooks/subscriptions/use-recent-application";

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
  const { data = recentLoanApplications } = useRecentLoanApplications();
  return (
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
          <TableRow key={item.id}>
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
                <span>{format(item.created_at, "MMM d, yyyy")}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "text-xs capitalize",
                  item.status === "active" && "bg-sky-500/50 text-sky-200",
                  item.status === "overdue" &&
                    "bg-yellow-700/50 text-yellow-300",
                  item.status === "completed" &&
                    "bg-emerald-800/50 text-emerald-300"
                )}
              >
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentApplicationTable;
