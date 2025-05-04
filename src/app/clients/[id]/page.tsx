import { getClientById } from "@/app/supabase-queries";
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
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type ParamsType = {
  params: Promise<{ id: string }>;
};

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
  const data = await getClientById(id);
  const clientName =
    data !== null ? data.map((client: Client) => client.name) : id;

  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-12">
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
              <BreadcrumbPage className="font-semibold">
                {clientName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="container border-t border-b py-8">
        {data?.map((client: Client) => (
          <div key={client.id} className="flex">
            <div className="flex-1 flex flex-col space-y-5">
              <div className="flex gap-4">
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={70}
                  height={70}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-1">
                  <Badge className="uppercase">{client.status}</Badge>
                  <strong className="text-accent-foreground font-bold text-2xl">
                    {client.name}
                  </strong>
                  <address className="text-primary font-semibold text-sm">
                    {client.email}
                  </address>
                </div>
              </div>
              <p className="text-accent-foreground max-w-sm font-medium">
                {client.bio}
              </p>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col">
                <strong className="text-accent-foreground">Phone Number</strong>
                <address className="text-primary font-semibold text-sm">
                  +{client.phone}
                </address>
              </div>
              <div className="flex flex-col">
                <strong className="text-accent-foreground">Addess</strong>
                <address className="text-primary font-semibold text-sm">
                  {client.address}
                </address>
              </div>
              <div className="flex flex-col">
                <strong className="text-accent-foreground">Joined at</strong>
                <span className="text-primary font-semibold text-sm">
                  {formatDate(client.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default ClientProfilePage;
