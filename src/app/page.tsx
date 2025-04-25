import TransactionChart from "@/components/chart";
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import RecentTransactions from "@/components/recent-transaction";
import ChartHeader from "@/components/chart-header";
import { DashboardInfoCards } from "@/components/info-card";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-5">
        {/* <header className="flex h-8 shrink-0 items-center px-4">
          <SidebarTrigger className="-ml-1" />
        </header> */}
        <h1 className="text-xl md:text-2xl font-bold tracking-tight md:pb-4">
          Dashboard
        </h1>

        <DashboardInfoCards />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-3 items-stretch mt-4">
          <div className="shadow-md border rounded-xl bg-muted/50 col-span-1 md:col-span-2 flex flex-col h-full">
            <ChartHeader />
            <div className="flex-1 px-2">
              <TransactionChart />
            </div>
          </div>
          <div className="col-span-1 rounded-xl h-full">
            <RecentTransactions />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
