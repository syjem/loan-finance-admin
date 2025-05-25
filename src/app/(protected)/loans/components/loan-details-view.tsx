"use client";

import { FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getMonthlyPayment } from "@/lib/utils";
import type { Loan } from "@/lib/types";
import { LoanDetailsTimeline } from "./loan-details-timeline";

export function LoanDetailsView({ loan }: { loan: Loan }) {
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
                <p className="text-lg font-semibold">
                  {formatCurrency(loan.amount)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Purpose
                </label>
                <p className="capitalize">
                  {loan.purpose}
                  {loan.purpose !== "others" && " Loan"}
                </p>
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
                  {formatCurrency(
                    getMonthlyPayment(
                      loan.amount,
                      loan.interest_rate,
                      loan.term
                    )
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

      <LoanDetailsTimeline loan={loan} />

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
