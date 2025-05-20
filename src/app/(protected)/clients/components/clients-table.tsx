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
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

// Sample client data
const clients = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@johnson.com",
    phone: "(123) 456-7890",
    company: "Johnson Enterprises",
    type: "Business",
    status: "Active",
    totalLoans: 3,
    totalAmount: "$450,000",
    lastActivity: "2023-05-10",
    initials: "AJ",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@williams.com",
    phone: "(234) 567-8901",
    company: "Williams Group",
    type: "Business",
    status: "Active",
    totalLoans: 2,
    totalAmount: "$380,000",
    lastActivity: "2023-05-08",
    initials: "SW",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@brown.com",
    phone: "(345) 678-9012",
    company: "Brown Industries",
    type: "Business",
    status: "Active",
    totalLoans: 1,
    totalAmount: "$325,000",
    lastActivity: "2023-05-05",
    initials: "MB",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@davis.com",
    phone: "(456) 789-0123",
    company: "Davis LLC",
    type: "Business",
    status: "Inactive",
    totalLoans: 2,
    totalAmount: "$290,000",
    lastActivity: "2023-04-20",
    initials: "ED",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@wilson.com",
    phone: "(567) 890-1234",
    company: "Wilson Co.",
    type: "Business",
    status: "Active",
    totalLoans: 1,
    totalAmount: "$275,000",
    lastActivity: "2023-05-01",
    initials: "RW",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer@gmail.com",
    phone: "(678) 901-2345",
    company: "",
    type: "Individual",
    status: "Active",
    totalLoans: 1,
    totalAmount: "$150,000",
    lastActivity: "2023-04-28",
    initials: "JT",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david@miller.com",
    phone: "(789) 012-3456",
    company: "Miller Consulting",
    type: "Business",
    status: "Active",
    totalLoans: 2,
    totalAmount: "$220,000",
    lastActivity: "2023-04-25",
    initials: "DM",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa@gmail.com",
    phone: "(890) 123-4567",
    company: "",
    type: "Individual",
    status: "Inactive",
    totalLoans: 1,
    totalAmount: "$95,000",
    lastActivity: "2023-03-15",
    initials: "LA",
  },
  {
    id: "9",
    name: "James Wilson",
    email: "james@wilson.com",
    phone: "(901) 234-5678",
    company: "Wilson Enterprises",
    type: "Business",
    status: "Active",
    totalLoans: 3,
    totalAmount: "$410,000",
    lastActivity: "2023-05-03",
    initials: "JW",
  },
  {
    id: "10",
    name: "Patricia Moore",
    email: "patricia@gmail.com",
    phone: "(012) 345-6789",
    company: "",
    type: "Individual",
    status: "Active",
    totalLoans: 1,
    totalAmount: "$175,000",
    lastActivity: "2023-04-18",
    initials: "PM",
  },
];

export function ClientsTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter clients based on search term and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      searchTerm === "" ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      client.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === "all" ||
      client.type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewClient = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  return (
    <Card>
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
          <div className="flex gap-2">
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
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
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
                <TableHead>
                  <div className="flex items-center">
                    Client
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 data-[state=open]:bg-accent"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="sr-only">Sort by name</span>
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center">
                    Total Loans
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 data-[state=open]:bg-accent"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="sr-only">Sort by loans</span>
                    </Button>
                  </div>
                </TableHead>
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
                filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="cursor-pointer"
                    onClick={() => handleViewClient(client.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/placeholder.svg?height=36&width=36`}
                            alt={client.name}
                          />
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          {client.company && (
                            <div className="text-sm text-muted-foreground">
                              {client.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        {client.type === "Business" ? (
                          <Building className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <Users className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span>{client.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <div>{client.totalLoans} loans</div>
                        <div className="text-sm text-muted-foreground">
                          {client.totalAmount}
                        </div>
                      </div>
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
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/clients/${client.id}`);
                            }}
                          >
                            View client
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/clients/${client.id}/edit`);
                            }}
                          >
                            Edit client
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/deals/new?client=${client.id}`);
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            New loan application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
