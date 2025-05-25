import React from "react";
import { format, addMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Loan } from "@/lib/types";
import { useUpdateLoanStatus } from "@/hooks/subscriptions/use-update-loan-status";

export const LoanDetailsTimeline = ({ loan }: { loan: Loan }) => {
  const { data } = useUpdateLoanStatus(loan.id);
  const currentStatus = data?.[0]?.status ?? loan.status;

  return (
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
              <p className="font-semibold capitalize">{currentStatus}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
