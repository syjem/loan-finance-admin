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
import type { User as UserType } from "@supabase/supabase-js";

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
import { deleteLoanOfficer } from "@/app/actions/admin";
import { getInitials } from "@/lib/utils";

export function LoanOfficersTable({ loanAgents }: { loanAgents: UserType[] }) {
  const agents = loanAgents.map((agent) => ({
    id: agent.id,
    email: agent.email,
    phone: agent.phone,
    fullName: agent.user_metadata.full_name,
    position: agent.user_metadata.position,
    start_date: agent.user_metadata.start_date,
    avatar_url: agent.user_metadata.avatar_url,
  }));

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter officers based on search term
  const filteredOfficers = agents.filter(
    (agent) =>
      agent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.position?.toLowerCase().includes(searchTerm.toLowerCase())
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
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Officer</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Position</TableHead>
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
              filteredOfficers.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={agent.avatar_url}
                          alt={agent.fullName}
                        />
                        <AvatarFallback>
                          {getInitials(agent.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.fullName}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {agent.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">+{agent.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="flex items-center gap-1 w-fit">
                      {getRoleIcon(agent.position)}
                      <span className="hidden sm:inline">{agent.position}</span>
                      <span className="sm:hidden">{agent.position}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {/* <div>
                      <div className="text-sm font-medium">
                        {agent.totalLoans} loans
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {agent.approvalRate}% approval
                      </div>
                    </div> */}
                    (Number of loans here)
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="text-sm">
                      {format(agent.start_date, "MMM d, yyyy")}
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
                        <DropdownMenuItem onClick={() => handleEdit(agent.id)}>
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
                                permanently delete {agent.fullName}&apos;s
                                account and remove all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(agent.id)}
                                disabled={isDeleting === agent.id}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isDeleting === agent.id
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
