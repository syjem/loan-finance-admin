import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanDetailsView } from "../components/loan-details-view";
import { LoanStatusManager } from "../components/loan-status-manager";
import { LoanEditForm } from "../components/loan-edit-form";
import { getLoansById } from "@/app/data";
import type { Loan } from "@/lib/types";
import LoanStatusBadge from "../components/loan-status-badge";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const params = await searchParams;
  const data = await getLoansById(Number(params.id));
  const loan = data[0];

  if (!loan) {
    return {
      title: "Loan Not Found",
    };
  }

  return {
    title: `Loan ${loan.id} - Details`,
    description: `Loan application details for ${loan.clients.firstName} ${loan.clients.lastName}`,
  };
};

export default async function LoanDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;
  const data = await getLoansById(Number(params.id));
  const loan: Loan = data[0];

  if (!loan) {
    notFound();
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="mb-2">
            <Link href="/loans">
              <ArrowLeft className="h-4 w-4" />
              Back to Loan Applications
            </Link>
          </Button>
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">LOAN-{loan.id}</h1>
            <div className="flex items-center gap-2 mt-2">
              <LoanStatusBadge status={loan.status} loanId={loan.id} />
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {`${loan.clients.firstName} ${loan.clients.lastName}`}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/clients/${loan.clients.id}`}>
                <User className="h-4 w-4" />
                View Client
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Borrower Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <p className="text-base font-semibold">
                    {loan.clients.firstName} {loan.clients.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="truncate">{loan.clients.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <p>{loan.clients.phoneNumber}</p>
                </div>
                {loan.clients.companyName && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Company
                    </label>
                    <p>{loan.clients.companyName}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <LoanStatusManager loan={loan} />
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <LoanDetailsView loan={loan} />
            </TabsContent>
            <TabsContent value="edit" className="mt-4">
              <LoanEditForm loan={loan} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
