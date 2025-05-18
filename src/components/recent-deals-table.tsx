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

const recentDeals = [
  {
    id: "LOAN-7890",
    client: "Robert Chen",
    amount: "$175,000",
    purpose: "Business Expansion",
    date: new Date("2023-05-10"),
    status: "Approved",
  },
  {
    id: "LOAN-7891",
    client: "Jessica Martinez",
    amount: "$320,000",
    purpose: "Property Purchase",
    date: new Date("2023-05-08"),
    status: "Under Review",
  },
  {
    id: "LOAN-7892",
    client: "David Kim",
    amount: "$95,000",
    purpose: "Equipment Financing",
    date: new Date("2023-05-05"),
    status: "Pending",
  },
  {
    id: "LOAN-7893",
    client: "Amanda Taylor",
    amount: "$250,000",
    purpose: "Debt Consolidation",
    date: new Date("2023-05-03"),
    status: "Approved",
  },
  {
    id: "LOAN-7894",
    client: "Thomas Wright",
    amount: "$120,000",
    purpose: "Working Capital",
    date: new Date("2023-05-01"),
    status: "Rejected",
  },
];

export function RecentDealsTable() {
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
        {recentDeals.map((deal) => (
          <TableRow key={deal.id}>
            <TableCell className="font-medium">{deal.id}</TableCell>
            <TableCell>{deal.client}</TableCell>
            <TableCell>{deal.amount}</TableCell>
            <TableCell className="hidden md:table-cell">
              {deal.purpose}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{format(deal.date, "MMM d, yyyy")}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  deal.status === "Approved"
                    ? "default"
                    : deal.status === "Pending"
                    ? "secondary"
                    : deal.status === "Under Review"
                    ? "outline"
                    : "destructive"
                }
              >
                {deal.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
