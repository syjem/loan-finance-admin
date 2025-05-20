import React from "react";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DealStatusChart } from "./components/deals-status-chart";
import { RecentDealsTable } from "@/components/recent-deals-table";
import { MonthlyDealsChart } from "./components/monthly-deals-chart";
import { DashboardInfoCards } from "@/app/(protected)/dashboard/components/info-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <React.Fragment>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-sm font-medium tracking-tight">Dashboard</h1>
        </div>
      </header>

      <div className="space-y-4">
        <DashboardInfoCards />

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
            <CardDescription>
              View and manage recent loan applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDealsTable />
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid auto-rows-fr gap-4 md:grid-cols-3 items-stretch mt-4">
        <div className="shadow-md border rounded-xl bg-muted/50 col-span-1 md:col-span-2">
          <h3 className="my-4 mx-6 font-semibold text-lg text-slate-950 dark:text-slate-50 m-0">
            Clients Overview
          </h3>
          <TransactionChart />
        </div>
      </div> */}
    </React.Fragment>
  );
}
