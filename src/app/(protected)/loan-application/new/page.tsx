import type { Metadata } from "next";
import { LoanApplicationForm } from "@/app/(protected)/loan-application/components/loan-application-form";

export const metadata: Metadata = {
  title: "New Loan Application",
  description: "Submit a new loan application for a client",
};

export default function NewLoanApplicationPage() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Loan Application</h1>
        <p className="text-muted-foreground">
          Submit a new loan application for a client
        </p>
      </div>
      <LoanApplicationForm />
    </div>
  );
}
