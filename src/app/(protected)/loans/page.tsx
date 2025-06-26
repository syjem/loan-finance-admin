import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LoansTableAndFilter from "./components/loans-table-and-filter";
import { getAllLoans } from "@/app/data";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Applications",
  description: "Manage loan applications",
};

export default async function LoansPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string; status: string; page: number }>;
}) {
  const params = await searchParams;
  const query = params.query || "";
  const status = params.status || "all";
  const page = Number(params.page || 1);

  const perPage = 10;

  const { data, hasMore, total } = await getAllLoans(
    page,
    perPage,
    query,
    status
  );

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
          <Link href="/loans/new" className="flex items-center">
            <PlusIcon />
            New Application
          </Link>
        </Button>
      </header>

      <LoansTableAndFilter
        loans={data}
        query={query}
        status={status}
        page={page}
        hasMore={hasMore}
        total={total}
      />
    </div>
  );
}
