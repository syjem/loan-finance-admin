"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteLoanOfficer } from "@/app/actions";

// Sample loan officers data
const loanOfficers = [
  {
    id: "1",
    name: "Sarah Thompson",
    email: "sarah.thompson@lendingadmin.com",
    phone: "(555) 123-4567",
    role: "Senior Loan Officer",
    status: "Active",
    joinDate: new Date("2022-01-15"),
    totalLoans: 45,
    approvalRate: 78.5,
    initials: "ST",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@lendingadmin.com",
    phone: "(555) 234-5678",
    role: "Loan Officer",
    status: "Active",
    joinDate: new Date("2022-03-20"),
    totalLoans: 32,
    approvalRate: 82.1,
    initials: "MC",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@lendingadmin.com",
    phone: "(555) 345-6789",
    role: "Junior Loan Officer",
    status: "Active",
    joinDate: new Date("2023-01-10"),
    totalLoans: 18,
    approvalRate: 75.0,
    initials: "ER",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@lendingadmin.com",
    phone: "(555) 456-7890",
    role: "Loan Officer",
    status: "Inactive",
    joinDate: new Date("2021-11-05"),
    totalLoans: 67,
    approvalRate: 80.2,
    initials: "DW",
  },
  {
    id: "5",
    name: "Jessica Park",
    email: "jessica.park@lendingadmin.com",
    phone: "(555) 567-8901",
    role: "Senior Loan Officer",
    status: "Active",
    joinDate: new Date("2021-08-12"),
    totalLoans: 89,
    approvalRate: 85.3,
    initials: "JP",
  },
];

export function LoanOfficersTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter officers based on search term
  const filteredOfficers = loanOfficers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (officerId: string) => {
    router.push(`/admin/officers/${officerId}/edit`);
  };

  const handleDelete = async (officerId: string) => {
    setIsDeleting(officerId);
    try {
      await deleteLoanOfficer(officerId);
      router.push("/admin?deleted=true");
    } catch (error) {
      console.error("Error deleting officer:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes("Senior")) return <Shield className="h-3 w-3" />;
    return <User className="h-3 w-3" />;
  };

  const getRoleBadgeVariant = (role: string) => {
    if (role.includes("Senior")) return "default";
    if (role.includes("Junior")) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search officers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredOfficers.length} of {loanOfficers.length} officers
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Officer</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">
                Performance
              </TableHead>
              <TableHead className="hidden lg:table-cell">Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOfficers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? "No officers match your search."
                        : "No loan officers found."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOfficers.map((officer) => (
                <TableRow key={officer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`/placeholder.svg?height=36&width=36`}
                          alt={officer.name}
                        />
                        <AvatarFallback>{officer.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{officer.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {officer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{officer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{officer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getRoleBadgeVariant(officer.role)}
                      className="flex items-center gap-1 w-fit"
                    >
                      {getRoleIcon(officer.role)}
                      <span className="hidden sm:inline">{officer.role}</span>
                      <span className="sm:hidden">
                        {officer.role.includes("Senior")
                          ? "Senior"
                          : officer.role.includes("Junior")
                          ? "Junior"
                          : "Officer"}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{officer.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div>
                      <div className="text-sm font-medium">
                        {officer.totalLoans} loans
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {officer.approvalRate}% approval
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="text-sm">
                      {format(officer.joinDate, "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
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
                          onClick={() => handleEdit(officer.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Officer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Officer
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete {officer.name}&apos;s account
                                and remove all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(officer.id)}
                                disabled={isDeleting === officer.id}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isDeleting === officer.id
                                  ? "Deleting..."
                                  : "Delete Officer"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
