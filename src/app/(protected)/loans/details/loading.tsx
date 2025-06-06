import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Skeleton className="h-9 w-52" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-4 w-20 rounded-full" />
              <span className="text-muted-foreground">•</span>
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-7 w-28" />
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
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <Skeleton className="h-4 w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Company
                  </label>
                  <Skeleton className="h-4 w-[90%]" />
                </div>
              </div>
            </CardContent>
          </Card>
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
                  <Skeleton className="h-5 w-1/2 rounded-full" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Update Status
                </label>
                <Skeleton className="h-6 w-[60%]" />
              </div>
              <div className="pt-4 border-t">
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Loan Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Loan ID
                          </label>
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Loan Amount
                          </label>
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Purpose
                          </label>
                          <Skeleton className="h-4 w-40" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Loan Term
                          </label>
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Interest Rate
                          </label>
                          <Skeleton className="h-4 w-36" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Monthly Payment
                          </label>
                          <Skeleton className="h-4 w-28" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Total Payments
                          </label>
                          <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Remaining Balance
                          </label>
                          <Skeleton className="h-4 w-28" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Loan Officer
                          </label>
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Application Date
                          </label>
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Next Payment Date
                          </label>
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Approval Date
                          </label>
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground block">
                            Current Status
                          </label>
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
