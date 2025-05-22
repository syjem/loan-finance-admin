import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import RecentApplicationTable from "@/components/recent-applications-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecentLoanApplications } from "@/app/data";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Loan Applications",
  description: "Manage loan applications",
};

export default async function DealsPage() {
  const [recentLoanApplications] = await Promise.all([
    getRecentLoanApplications(),
  ]);
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
  );
}
