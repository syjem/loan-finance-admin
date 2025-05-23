import { FileText } from "lucide-react";
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
import { getClientLoansById } from "@/app/data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export const ClientLoansTable = async ({ clientId }: { clientId: string }) => {
  const loans = await getClientLoansById(clientId);
  console.log(loans);

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>Loan Applications</CardTitle>
        <CardDescription>View client&apos;s loan applications</CardDescription>
      </CardHeader>
      <CardContent>
        {loans.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground">
                No loans found for this client.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href={`/loans/new?client=${clientId}`}>Create New</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Purpose
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Start Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Term & Interest Rate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">LOAN-{loan.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(loan.amount)}</TableCell>
                    <TableCell className="hidden md:table-cell capitalize">
                      {loan.purpose}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(loan.created_at, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge variant="default">{loan.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">{loan.term}</div>
                      <div className="text-sm text-muted-foreground">
                        {loan.interest_rate}%
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
};
