"use client";

import { useState } from "react";
import { Check, Clock, AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { updateLoan, deleteLoan } from "@/app/actions";
import type { Loan } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusOptions = [
  {
    value: "active",
    label: "Active",
    icon: Clock,
    variant: "secondary" as const,
  },
  {
    value: "overdue",
    label: "Overdue",
    icon: AlertTriangle,
    variant: "outline" as const,
  },
  {
    value: "completed",
    label: "Completed",
    icon: Check,
    variant: "default" as const,
  },
];

export function LoanStatusManager({ loan }: { loan: Loan }) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(loan.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (
    newStatus: "active" | "overdue" | "completed"
  ) => {
    setIsUpdating(true);
    try {
      await updateLoan(loan.id, newStatus);
      setCurrentStatus(newStatus);
      // In a real app, you might want to show a success toast
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error - maybe show an error toast
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLoan = async () => {
    setIsDeleting(true);
    try {
      await deleteLoan(loan.id);
      router.push("/deals?deleted=true");
    } catch (error) {
      console.error("Error deleting loan:", error);
      // Handle error
    } finally {
      setIsDeleting(false);
    }
  };

  const currentStatusOption = statusOptions.find(
    (option) => option.value === currentStatus
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Status Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Current Status
          </label>
          <div className="mt-1">
            <Badge
              className={cn(
                "capitalize rounded-full",
                currentStatus === "active"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  : currentStatus === "overdue"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              )}
            >
              {currentStatusOption && (
                <currentStatusOption.icon className="mr-1 h-3 w-3" />
              )}
              {currentStatus}
            </Badge>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Update Status
          </label>
          <Select
            value={currentStatus}
            onValueChange={handleStatusChange}
            disabled={isUpdating}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer w-full bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100 hover:dark:bg-rose-800/80"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Loan
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  loan application for{" "}
                  <strong className="font-extrabold">
                    {loan.clients.firstName} {loan.clients.lastName}
                  </strong>{" "}
                  and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteLoan}
                  disabled={isDeleting}
                  className="bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100 hover:dark:bg-rose-800/80"
                >
                  {isDeleting ? "Deleting..." : "Delete Loan"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
