import Link from "next/link";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { RecentDealsTable } from "@/components/recent-deals-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Loan Applications",
  description: "Manage loan applications",
};

export default function DealsPage() {
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
          <Link href="/loan-application/new">
            <Plus className="h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>

      <Card>
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
  );
}
