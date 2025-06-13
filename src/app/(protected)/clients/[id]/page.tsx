import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building, Edit, Mail, MapPin, Phone, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ClientLoansTable } from "@/app/(protected)/clients/components/client-loans-table";
import { getClientById } from "@/app/data";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: ParamsType): Promise<Metadata> => {
  const id = (await params).id;
  const data = await getClientById(id);

  if (!data || data.length === 0) {
    return {
      title: "Client Not Found",
    };
  }

  const client = data[0];

  return {
    title: `${client.firstName} ${client.lastName} - Client Details`,
    description: `Client information for ${client.firstName}`,
  };
};

const ClientProfilePage = async ({ params }: ParamsType) => {
  const id = (await params).id;
  const data = await getClientById(id);

  if (!data || data.length === 0) {
    notFound();
  }

  const client = data[0];
  const clientName = `${client.firstName} ${client.lastName}`;

  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-base">
                <Link href="/clients">Clients</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                {clientName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container py-6">
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.avatar} alt={clientName} />
                <AvatarFallback className="text-xl">
                  {getInitials(clientName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{clientName}</h1>
                <div className="flex items-center gap-2">
                  <Badge
                    className="capitalize rounded-full"
                    variant={
                      client.status === "active" ? "default" : "secondary"
                    }
                  >
                    {client.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground capitalize">
                    {client.type === "business" ? (
                      <Building className="mr-1 h-3 w-3" />
                    ) : (
                      <Users className="mr-1 h-3 w-3" />
                    )}
                    {client.type}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href={`/clients/${client.id}/edit`}>
                  <Edit className="h-4 w-4" />
                  Edit Client
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/loans/new?client=${client.id}`}>
                  <Plus className="h-4 w-4" />
                  New Loan
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Contact Information
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phoneNumber}</span>
                  </div>
                </div>

                {client.companyName && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      Company
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{client.companyName}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Address
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{client.address}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Additional Details
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">Client Since</div>
                    <div className="text-sm font-medium">
                      {formatDate(client.created_at)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 bg-muted/50">
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total Loans
                    </div>
                    <div className="text-2xl font-bold">
                      {client.loans.length}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total Amount
                    </div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        client.loans.reduce(
                          (sum: number, loan: { amount: number }) =>
                            sum + loan.amount,
                          0
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    Last Activity
                  </div>
                  <div className="text-sm">
                    {client.loans.length > 0
                      ? formatDate(
                          client.loans
                            .slice()
                            .sort(
                              (
                                a: { created_at: string },
                                b: { created_at: string }
                              ) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                            )[0].created_at
                        )
                      : "No activity"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <ClientLoansTable clientId={client.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfilePage;
