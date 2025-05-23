import type { Metadata } from "next";
import { LoanApplicationForm } from "@/app/(protected)/loans/components/loan-application-form";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "New Loan Application",
  description: "Submit a new loan application for a client",
};

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function NewLoanApplicationPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const clientId = searchParams.client;

  return (
    <div className="container max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-base font-medium tracking-tight">
            New Loan Applications
          </h1>
        </div>
      </header>
      <LoanApplicationForm client={clientId} />
    </div>
  );
}
