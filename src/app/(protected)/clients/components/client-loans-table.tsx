import { FileText, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample loan data for a client
const clientLoans = {
  "1be86f6b-0b6d-4628-be80-9fa20b96e8c9": [
    {
      id: "LOAN-7890",
      amount: "$175,000",
      purpose: "Business Expansion",
      startDate: new Date("2023-01-15"),
      term: "5 Years",
      status: "Active",
      nextPayment: new Date("2023-06-15"),
      paymentAmount: "$3,500",
    },
    {
      id: "LOAN-6543",
      amount: "$125,000",
      purpose: "Equipment Financing",
      startDate: new Date("2022-08-10"),
      term: "3 Years",
      status: "Active",
      nextPayment: new Date("2023-06-10"),
      paymentAmount: "$4,200",
    },
    {
      id: "LOAN-5432",
      amount: "$150,000",
      purpose: "Working Capital",
      startDate: new Date("2021-05-20"),
      term: "5 Years",
      status: "Active",
      nextPayment: new Date("2023-06-20"),
      paymentAmount: "$3,100",
    },
  ],
  "2": [
    {
      id: "LOAN-8901",
      amount: "$230,000",
      purpose: "Property Purchase",
      startDate: new Date("2022-11-05"),
      term: "10 Years",
      status: "Active",
      nextPayment: new Date("2023-06-05"),
      paymentAmount: "$2,800",
    },
    {
      id: "LOAN-7654",
      amount: "$150,000",
      purpose: "Business Expansion",
      startDate: new Date("2021-09-15"),
      term: "5 Years",
      status: "Active",
      nextPayment: new Date("2023-06-15"),
      paymentAmount: "$3,200",
    },
  ],
};

export function ClientLoansTable({ clientId }: { clientId: string }) {
  const loans = clientLoans[clientId as keyof typeof clientLoans] || [];

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>Loan Applications</CardTitle>
        <CardDescription>
          View and manage client&apos;s loan applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loans.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground">
                No loans found for this client.
              </p>
              <Button className="mt-4" variant="outline">
                Create New Loan
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Loan ID
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 data-[state=open]:bg-accent"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="sr-only">Sort</span>
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Purpose
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Start Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Next Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{loan.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {loan.purpose}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(loan.startDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{loan.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        {format(loan.nextPayment, "MMM d, yyyy")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {loan.paymentAmount}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
