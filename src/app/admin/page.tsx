import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoanOfficersTable } from "./components/loan-officers-table";
import { AdminStats } from "./components/admin-stats";
import { getAllAgents } from "./data";

export const metadata: Metadata = {
  title: "Admin Dashboard - Manage Loan Officers",
  description: "Manage loan officers and agents in the system",
};

export default async function AdminPage() {
  const loanAgents = await getAllAgents();

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-slate-950/80 px-4 md:px-6 backdrop-blur">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">Admin Dashboard</span>
        </div>
      </header>

      <div className="container py-6 mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Loan Officers Management</h1>
            <p className="text-muted-foreground">
              Manage loan officers and agents in the system
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Clients Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/new">
                <Plus className="h-4 w-4" />
                Add Loan Officer
              </Link>
            </Button>
          </div>
        </div>

        <AdminStats />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Loan Officers & Agents</CardTitle>
            <CardDescription>
              Manage team members who can process loan applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoanOfficersTable loanAgents={loanAgents ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
