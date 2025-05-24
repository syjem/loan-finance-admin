"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  Search,
  FileText,
  Mail,
  Phone,
  Building,
  Filter,
  Users,
  UserPen,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, getInitials } from "@/lib/utils";
import type { CLientType } from "@/lib/types";

export function ClientsTable({ clients }: { clients: CLientType[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter clients based on search term and filters
  const filteredClients = clients
    .filter((client) => {
      const matchesSearch =
        searchTerm === "" ||
        client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        client.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesType =
        typeFilter === "all" ||
        client.type.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const totalA = a.loans.reduce((sum, loan) => sum + loan.amount, 0);
      const totalB = b.loans.reduce((sum, loan) => sum + loan.amount, 0);
      return sortDirection === "asc" ? totalA - totalB : totalB - totalA;
    });

  const handleViewClient = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  return (
    <Card className="bg-muted/50">
      <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <CardTitle>Clients</CardTitle>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-all"
                          checked={statusFilter === "all"}
                          onCheckedChange={() => setStatusFilter("all")}
                        />
                        <label
                          htmlFor="status-all"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          All
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-active"
                          checked={statusFilter === "active"}
                          onCheckedChange={() => setStatusFilter("active")}
                        />
                        <label
                          htmlFor="status-active"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Active
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-inactive"
                          checked={statusFilter === "inactive"}
                          onCheckedChange={() => setStatusFilter("inactive")}
                        />
                        <label
                          htmlFor="status-inactive"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Client Type</h4>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="type-all"
                          checked={typeFilter === "all"}
                          onCheckedChange={() => setTypeFilter("all")}
                        />
                        <label
                          htmlFor="type-all"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          All
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="type-business"
                          checked={typeFilter === "business"}
                          onCheckedChange={() => setTypeFilter("business")}
                        />
                        <label
                          htmlFor="type-business"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Business
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="type-individual"
                          checked={typeFilter === "individual"}
                          onCheckedChange={() => setTypeFilter("individual")}
                        />
                        <label
                          htmlFor="type-individual"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Individual
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-accent cursor-pointer"
                    onClick={() =>
                      setSortDirection((prev) =>
                        prev === "asc" ? "desc" : "asc"
                      )
                    }
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
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No clients found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => {
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
                            <span className="text-sm">
                              {client.phoneNumber}
                            </span>
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
        </div>
      </CardContent>
    </Card>
  );
}
