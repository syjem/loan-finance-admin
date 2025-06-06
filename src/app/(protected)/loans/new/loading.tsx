import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { STEPS as steps } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function Loading() {
  const currentStep = 0;
  return (
    <div className="container max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-base font-medium tracking-tight">
            New Loan Applications
          </h1>
        </div>
      </header>
      <Card>
        <CardContent className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold",
                      currentStep > index
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep === index
                        ? "border-primary text-primary"
                        : "border-muted-foreground/25 text-muted-foreground"
                    )}
                  >
                    {currentStep > index ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div
                    className={cn(
                      "mt-2 hidden text-xs font-medium md:block",
                      currentStep >= index
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 bg-primary transition-all"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-5 w-64" />

            {/* Form section starts */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-4 w-1/2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2 5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2 5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2 5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>

              <div className="space-y-2 5">
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-9 w-full" />
              </div>

              <div className="flex justify-between space-x-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
