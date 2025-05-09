import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TransactionChart from "@/app/(protected)/dashboard/components/chart";
import { DashboardInfoCards } from "@/app/(protected)/dashboard/components/info-card";
import RecentTransactionSkeleton from "@/components/fallback-ui/recent-transactions";
import RecentTransactionServer from "@/app/(protected)/dashboard/components/recent-transaction-server";
import NewDeals from "@/app/(protected)/dashboard/components/new-deal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-sm font-medium tracking-tight">Dashboard</h1>
        </div>
        <NewDeals />
      </header>

      <DashboardInfoCards />
      <div className="grid auto-rows-fr gap-4 md:grid-cols-3 items-stretch mt-4">
        <div className="shadow-md border rounded-xl bg-muted/50 col-span-1 md:col-span-2">
          <h3 className="my-4 mx-6 font-semibold text-lg text-slate-950 dark:text-slate-50 m-0">
            Clients Overview
          </h3>
          <TransactionChart />
        </div>
        <div className="col-span-1 rounded-xl">
          <Suspense fallback={<RecentTransactionSkeleton />}>
            <RecentTransactionServer />
          </Suspense>
        </div>
      </div>
    </>
  );
}
