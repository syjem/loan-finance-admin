"use client";

import { Badge } from "@/components/ui/badge";
import { useUpdateLoanStatus } from "@/hooks/subscriptions/use-update-loan-status";
import { cn } from "@/lib/utils";
import React from "react";

const LoanStatusBadge = ({
  status,
  loanId,
}: {
  status: "active" | "overdue" | "completed";
  loanId: number;
}) => {
  const { data } = useUpdateLoanStatus(loanId);

  const currentStatus = data?.[0]?.status ?? status;

  return (
    <Badge
      className={cn(
        "capitalize rounded-full",
        currentStatus === "active"
          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
          : currentStatus === "overdue"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      )}
    >
      {currentStatus}
    </Badge>
  );
};

export default LoanStatusBadge;
