import { format, addMonths } from "date-fns";
import { Calendar, FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyPayment } from "@/lib/utils";

interface LoanDetailsViewProps {
  loan: {
    id: string;
    clients: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      type: "individual" | "business";
      phoneNumber: string;
      companyName: string | null;
    };
    amount: number;
    purpose: string;
    term: string;
    interest_rate: number;
    created_at: string;
    status: string;
    notes: string;
    loanOfficer: string;
    monthlyPayment: number;
    totalPayments: number;
    remainingBalance: number;
  };
}

export function LoanDetailsView({ loan }: LoanDetailsViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Loan Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loan ID
                </label>
                <p className="text-lg font-semibold">{loan.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loan Amount
                </label>
                <p className="text-lg font-semibold">${loan.amount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Purpose
                </label>
                <p className="capitalize">{loan.purpose} Loan</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loan Term
                </label>
                <p className="capitalize">{loan.term}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Interest Rate
                </label>
                <p>{loan.interest_rate}% APR</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Monthly Payment
                </label>
                <p className="text-lg font-semibold">
                  $
                  {getMonthlyPayment(
                    loan.amount,
                    loan.interest_rate,
                    loan.term
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Total Payments
                </label>
                <p>3 payments</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Remaining Balance
                </label>
                <p className="text-lg font-semibold">
                  ${loan.remainingBalance}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loan Officer
                </label>
                <p>{loan.loanOfficer}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Application Date
                </label>
                <p>{format(loan.created_at, "MMMM d, yyyy")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Next Payment Date
                </label>
                <p>{format(addMonths(loan.created_at, 1), "MMMM d, yyyy")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Approval Date
                </label>
                <p>{format(loan.created_at, "MMMM d, yyyy")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Current Status
                </label>
                <p className="font-semibold capitalize">{loan.status}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {loan.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{loan.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
