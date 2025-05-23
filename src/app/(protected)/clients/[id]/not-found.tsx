import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const NotFound = () => {
  return (
    <React.Fragment>
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
                Client not found
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container grid place-content-center h-[calc(100%_-_16px)]">
        <div className="flex items-center gap-4">
          <strong className="text-2xl">404</strong>
          <Separator orientation="vertical" />
          This client could not found{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
