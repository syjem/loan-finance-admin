import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AllLoansTable from "./components/all-loans-table";
import { getAllLoans } from "@/app/data";

export const metadata: Metadata = {
  title: "Loan Applications",
  description: "Manage loan applications",
};

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string; status: string }>;
}) {
  const allLoans = await getAllLoans();
  const query = (await searchParams).query || "";
  const status = (await searchParams).status || "all";

  const filteredLoans = allLoans.filter((loan) => {
    const filterByQuery =
      query === "" ||
      loan.firstName.toLowerCase().includes(query.toLowerCase()) ||
      loan.lastName.toLowerCase().includes(query.toLowerCase());

    const filterByStatus = status || loan.status === status;

    return filterByQuery && filterByStatus;
  });

  return (
    <div className="container space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-base font-medium tracking-tight">
            Loan Applications
          </h1>
        </div>
        <Button asChild>
          <Link href="/loans/new">New Application</Link>
        </Button>
      </header>

      <AllLoansTable loans={filteredLoans} query={query} status={status} />
    </div>
  );
}
