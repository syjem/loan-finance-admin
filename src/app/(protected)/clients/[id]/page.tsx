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
import {
  Building,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientLoansTable } from "@/app/(protected)/clients/components/client-loans-table";
import { ClientActivityTable } from "@/app/(protected)/clients/components/client-activity-table";
import { ClientDocumentsTable } from "@/app/(protected)/clients/components/client-documents-table";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: ParamsType): Promise<Metadata> => {
  const id = (await params).id;
  const client = clients.find((c) => c.id === id);

  if (!client) {
    return {
      title: "Client Not Found",
    };
  }

  return {
    title: `${client.name} - Client Details`,
    description: `Client information for ${client.name}`,
  };
};

const clients = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@johnson.com",
    phone: "(123) 456-7890",
    company: "Johnson Enterprises",
    type: "Business",
    status: "Active",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    totalLoans: 3,
    totalAmount: "$450,000",
    lastActivity: "2023-05-10",
    initials: "AJ",
    joinDate: "2021-03-15",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@williams.com",
    phone: "(234) 567-8901",
    company: "Williams Group",
    type: "Business",
    status: "Active",
    address: "456 Corporate Blvd, Chicago, IL 60601",
    totalLoans: 2,
    totalAmount: "$380,000",
    lastActivity: "2023-05-08",
    initials: "SW",
    joinDate: "2021-06-22",
  },
  // Add more clients as needed
];

export type Client = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "blacklisted";
  bio: string;
};

const ClientProfilePage = async ({ params }: ParamsType) => {
  const id = (await params).id;

  const client = clients.find((c) => c.id === id);

  if (!client) {
    notFound();
  }

  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/clients">Clients</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container py-6">
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={`/placeholder.svg?height=64&width=64`}
                  alt={client.name}
                />
                <AvatarFallback className="text-xl">
                  {client.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{client.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      client.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {client.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {client.type === "Business" ? (
                      <Building className="mr-1 h-3 w-3" />
                    ) : (
                      <Users className="mr-1 h-3 w-3" />
                    )}
                    {client.type}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/clients/${client.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Client
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/deals/new?client=${client.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Loan
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
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
                    <span>{client.phone}</span>
                  </div>
                </div>

                {client.company && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      Company
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{client.company}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Address
                  </div>
                  <div className="flex items-start gap-2">
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
                      {new Date(client.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
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
                      {client.totalLoans}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total Amount
                    </div>
                    <div className="text-2xl font-bold">
                      {client.totalAmount}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Last Activity
                  </div>
                  <div className="text-sm">
                    {new Date(client.lastActivity).toLocaleDateString()}
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/deals?client=${client.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View All Loans
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="loans">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="loans">Loans</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="loans" className="mt-4">
                <ClientLoansTable clientId={client.id} />
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <ClientActivityTable clientId={client.id} />
              </TabsContent>
              <TabsContent value="documents" className="mt-4">
                <ClientDocumentsTable clientId={client.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfilePage;
