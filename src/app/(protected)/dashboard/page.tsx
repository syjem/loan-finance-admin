import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TransactionChart from "@/app/(protected)/dashboard/components/chart";
import ChartHeader from "@/app/(protected)/dashboard/components/chart-header";
import { DashboardInfoCards } from "@/app/(protected)/dashboard/components/info-card";
import RecentTransactionSkeleton from "@/components/fallback-ui/recent-transactions";
import RecentTransactionServer from "@/app/(protected)/dashboard/components/recent-transaction-server";

export default function Dashboard() {
  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <h1 className="text-base md:text-lg font-[500] tracking-tight">
          Dashboard
        </h1>
      </header>

      <DashboardInfoCards />
      <div className="grid auto-rows-fr gap-4 md:grid-cols-3 items-stretch mt-4">
        <div className="shadow-md border rounded-xl bg-muted/50 col-span-1 md:col-span-2 flex flex-col h-full">
          <ChartHeader />
          <div className="flex-1 px-2">
            <TransactionChart />
          </div>
        </div>
        <div className="col-span-1 rounded-xl h-full">
          <Suspense fallback={<RecentTransactionSkeleton />}>
            <RecentTransactionServer />
          </Suspense>
        </div>
      </div>
    </>
  );
}
