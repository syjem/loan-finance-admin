import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientStats } from "@/app/(protected)/clients/components/client-stats";
import { ClientsTable } from "@/app/(protected)/clients/components/clients-table";
import {
  getActiveBorrowers,
  getClients,
  getTotalNumberOfClients,
  getBusinessClients,
  getClientsThisMonth,
} from "@/app/data";

export const metadata: Metadata = {
  title: "Client Management",
  description: "Manage client information and loan history",
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    status: string;
    type: string;
    page: number;
  }>;
}) {
  const params = await searchParams;

  const q = params.q || "";
  const status = params.status || "all";
  const type = params.type || "all";
  const page = Number(params.page || 1);
  const pageSize = 10;

  const [
    clients,
    totalNumberOfClients,
    totalActiveBorrowers,
    totalBusinessClients,
    totalClientsThisMonth,
  ] = await Promise.all([
    getClients(page, pageSize, q, status, type),
    getTotalNumberOfClients(),
    getActiveBorrowers(),
    getBusinessClients(),
    getClientsThisMonth(),
  ]);

  return (
    <div className="container space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-base font-medium tracking-tight">
            Client Management
          </h1>
        </div>
        <Button asChild>
          <Link href="/clients/new">Add Client</Link>
        </Button>
      </header>
      <div className="container space-y-6">
        <ClientStats
          totalNumberOfClients={totalNumberOfClients}
          activeBorrowers={totalActiveBorrowers}
          businessClients={totalBusinessClients}
          totalClientsThisMonth={totalClientsThisMonth}
        />
        <ClientsTable
          clients={clients}
          q={q}
          status={status}
          type={type}
          page={page}
        />
      </div>
    </div>
  );
}
