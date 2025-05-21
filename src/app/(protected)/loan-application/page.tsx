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

export const metadata: Metadata = {
  title: "Loan Applications",
  description: "Manage loan applications",
};

export default async function DealsPage() {
  const [recentLoanApplications] = await Promise.all([
    getRecentLoanApplications(),
  ]);
  return (
    <div className="container py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Loan Applications</h1>
          <p className="text-muted-foreground">
            Manage and track all loan applications
          </p>
        </div>
        <Button asChild>
          <Link href="/loan-application/new">New Application</Link>
        </Button>
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
  );
}
