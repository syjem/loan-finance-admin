import type { Metadata } from "next";
import { AddLoanAgentForm } from "../components/add-loan-agent-form";

export const metadata: Metadata = {
  title: "Add New Loan Officer",
  description: "Add a new loan officer to the system",
};

export default function AddOfficerPage() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl py-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Loan Officer</h1>
          <p className="text-muted-foreground">
            Create a new loan officer account
          </p>
        </div>
        <AddLoanAgentForm />
      </div>
    </div>
  );
}
