import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DealStatusChart } from "./components/deals-status-chart";
import RecentApplicationTable from "@/components/recent-applications-table";
import { MonthlyDealsChart } from "./components/monthly-deals-chart";
import ClientsOverviewChart from "./components/clients-overview-chart";
import OverviewCards from "@/app/(protected)/dashboard/components/overview-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getTotalClients,
  getLoanStats,
  getClientsTotalValue,
  getRecentLoanApplications,
} from "@/app/data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const [numberOfClients, stats, clientsTotalValue, recentLoanApplications] =
    await Promise.all([
      getTotalClients(),
      getLoanStats(),
      getClientsTotalValue(),
      getRecentLoanApplications(),
    ]);

  return (
    <React.Fragment>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-sm font-medium tracking-tight">Dashboard</h1>
        </div>

        <Button asChild>
          <Link href="/loan-application/new">New Loan Application</Link>
        </Button>
      </header>

      <div className="space-y-4">
        <OverviewCards numberOfClients={numberOfClients} initialStats={stats} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 bg-muted/50">
            <CardHeader>
              <CardTitle>Monthly Deals</CardTitle>
              <CardDescription>
                Number of new loan applications per month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyDealsChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 bg-muted/50">
            <CardHeader>
              <CardTitle>Deal Status</CardTitle>
              <CardDescription>
                Distribution of loan applications by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DealStatusChart />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>View recent loan applications</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentApplicationTable
              recentLoanApplications={recentLoanApplications}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid auto-rows-fr gap-4 md:grid-cols-3 items-stretch mt-4">
        <Card className="bg-muted/50 col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Clients Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientsOverviewChart clientsTotalValue={clientsTotalValue} />
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}
