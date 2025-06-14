"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import {
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  Mail,
  Phone,
  Building,
  Users,
  UserPen,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CLientType } from "@/lib/types";
import { PaginationComponent } from "@/components/custom-pagination";

type DataTableProps = {
  q: string;
  status: string;
  type: string;
  page: number;
  clients: {
    data: CLientType[];
    hasMore: boolean;
    total: number;
  };
};

const DataTable = ({ q, status, type, page, clients }: DataTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleViewClient = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    const pageParams = params.toString();

    router.push(`${pathname}?${pageParams ? `${pageParams}` : ""}`);
  };

  return (
    <React.Fragment>
      <Table className="rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden lg:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">
              <Button
                variant="ghost"
                className="data-[state=open]:bg-accent cursor-pointer"
              >
                Total Loans
                <ArrowUpDown className="h-4 w-4" />
                <span className="sr-only">Sort by loans</span>
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            clients.data.map((client) => {
              const name = `${client.firstName} ${client.lastName}`;

              return (
                <TableRow
                  key={client.id}
                  className="cursor-pointer"
                  onClick={() => handleViewClient(client.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.avatar} alt={name} />
                        <AvatarFallback>{getInitials(name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{name}</div>
                        {client.companyName && (
                          <div className="text-sm text-muted-foreground">
                            {client.companyName}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{client.phoneNumber}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      {client.type === "business" ? (
                        <Building className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <Users className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span className="capitalize">{client.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="pl-3">
                      <div>
                        {client.loans.length}{" "}
                        {client.loans.length > 1 ? "loans" : "loan"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(
                          client.loans.reduce(
                            (sum, loan) => sum + loan.amount,
                            0
                          )
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="capitalize rounded-full"
                      variant={
                        client.status === "active" ? "default" : "outline"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/clients/${client.id}`);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          View client
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/clients/${client.id}/edit`);
                          }}
                        >
                          <UserPen className="h-4 w-4" />
                          Edit client
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/loans/new?client=${client.id}`);
                          }}
                        >
                          <FileText className="h-4 w-4" />
                          New loan application
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <div
        className={cn(
          "pt-4 border-t flex items-center justify-end",
          (q || status !== "all" || type !== "all") && "justify-between"
        )}
      >
        {(q || status !== "all" || type !== "all") && (
          <div className="flex flex-wrap shrink-0 gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {q && (
              <Badge variant="outline" className="text-xs">
                Client: {q}
              </Badge>
            )}
            {status !== "all" && (
              <Badge variant="outline" className="text-xs capitalize">
                Status: {status}
              </Badge>
            )}
            {type !== "all" && (
              <Badge variant="outline" className="text-xs capitalize">
                Type: {type}
              </Badge>
            )}
            {clients.data.length > 0 && (
              <Badge variant="outline" className="text-xs">
                Total: {clients.data.length}
              </Badge>
            )}
          </div>
        )}

        <PaginationComponent
          page={page}
          totalItems={clients.total}
          perPage={10}
          hasMore={clients.hasMore}
          onPageChange={handlePageChange}
        />
      </div>
    </React.Fragment>
  );
};

export default DataTable;
