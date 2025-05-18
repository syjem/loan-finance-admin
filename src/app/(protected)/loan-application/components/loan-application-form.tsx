"use client";

import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLoanApplication } from "@/app/actions";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormValues } from "@/lib/types";
import { formSchema } from "@/lib/schema";

// Sample clients data
const clients = [
  { value: "1", label: "Alex Johnson" },
  { value: "2", label: "Sarah Williams" },
  { value: "3", label: "Michael Brown" },
  { value: "4", label: "Emily Davis" },
  { value: "5", label: "Robert Wilson" },
  { value: "6", label: "Jessica Martinez" },
  { value: "7", label: "David Kim" },
  { value: "8", label: "Amanda Taylor" },
  { value: "9", label: "Thomas Wright" },
  { value: "10", label: "Robert Chen" },
];

// Form steps
const steps = [
  {
    id: "step-1",
    name: "Borrower Information",
    fields: [
      "clientId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "companyName",
    ],
  },
  {
    id: "step-2",
    name: "Loan Details",
    fields: [
      "loanAmount",
      "loanPurpose",
      "loanTerm",
      "interestRate",
      "startDate",
    ],
  },
  {
    id: "step-3",
    name: "Additional Information",
    fields: ["creditScore", "annualIncome", "collateral", "additionalNotes"],
  },
  {
    id: "step-4",
    name: "Review",
    fields: [],
  },
];

export function LoanApplicationForm() {
  const router = useRouter();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      loanAmount: "",
      interestRate: "",
      creditScore: "",
      annualIncome: "",
      collateral: "",
      additionalNotes: "",
    },
  });

  // Watch for client selection to auto-fill form
  const selectedClientId = form.watch("clientId");

  // Auto-fill form when client is selected
  const handleClientSelect = (clientId: string) => {
    // In a real app, you would fetch client details from API
    // For demo, we'll use mock data
    const clientData: Record<string, any> = {
      "1": {
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex@johnson.com",
        phone: "1234567890",
        companyName: "Johnson Enterprises",
      },
      "2": {
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah@williams.com",
        phone: "2345678901",
        companyName: "Williams Group",
      },
      // Add more client data as needed
    };

    if (clientData[clientId]) {
      const data = clientData[clientId];
      form.setValue("firstName", data.firstName);
      form.setValue("lastName", data.lastName);
      form.setValue("email", data.email);
      form.setValue("phone", data.phone);
      form.setValue("companyName", data.companyName || "");
    }
  };

  // Check if fields in the current step are valid
  const validateStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any, { shouldFocus: true });
    return output;
  };

  // Go to the next step
  const nextStep = async () => {
    const isValid = await validateStep();
    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const serverData = await createLoanApplication(data);
      console.log(serverData);

      router.push("/loan-application");
      toast("Success!", {
        description: "The loan application has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Form progress */}
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

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Borrower Information */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="text-xl font-semibold">
                  Borrower Information
                </div>

                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select Existing Client (Optional)</FormLabel>
                      <Popover open={clientOpen} onOpenChange={setClientOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={clientOpen}
                              className="justify-between"
                            >
                              {field.value
                                ? clients.find(
                                    (client) => client.value === field.value
                                  )?.label
                                : "Search clients..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search clients..." />
                            <CommandList>
                              <CommandEmpty>No client found.</CommandEmpty>
                              <CommandGroup>
                                {clients.map((client) => (
                                  <CommandItem
                                    key={client.value}
                                    value={client.value}
                                    onSelect={(value) => {
                                      field.onChange(value);
                                      handleClientSelect(value);
                                      setClientOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        client.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {client.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select an existing client or enter new client details
                        below.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Loan Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-xl font-semibold">Loan Details</div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Amount ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="100000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="3.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="loanPurpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Purpose</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="business_expansion">
                              Business Expansion
                            </SelectItem>
                            <SelectItem value="property_purchase">
                              Property Purchase
                            </SelectItem>
                            <SelectItem value="equipment_financing">
                              Equipment Financing
                            </SelectItem>
                            <SelectItem value="debt_consolidation">
                              Debt Consolidation
                            </SelectItem>
                            <SelectItem value="working_capital">
                              Working Capital
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Term</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select term" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="6_months">6 Months</SelectItem>
                            <SelectItem value="1_year">1 Year</SelectItem>
                            <SelectItem value="2_years">2 Years</SelectItem>
                            <SelectItem value="3_years">3 Years</SelectItem>
                            <SelectItem value="5_years">5 Years</SelectItem>
                            <SelectItem value="10_years">10 Years</SelectItem>
                            <SelectItem value="15_years">15 Years</SelectItem>
                            <SelectItem value="30_years">30 Years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-xl font-semibold">
                  Additional Information
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="creditScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credit Score (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="720" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="annualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income ($) (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="75000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="collateral"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collateral (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Property, vehicle, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information about this loan application..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-xl font-semibold">Review Application</div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 border-b pb-4">
                    <h3 className="font-medium">Borrower Information</h3>
                    <div className="mt-2 grid gap-2 text-sm">
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Name:</span>
                        <span>
                          {form.getValues("firstName")}{" "}
                          {form.getValues("lastName")}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{form.getValues("email")}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{form.getValues("phone")}</span>
                      </div>
                      {form.getValues("companyName") && (
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">
                            Company:
                          </span>
                          <span>{form.getValues("companyName")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 border-b pb-4">
                    <h3 className="font-medium">Loan Details</h3>
                    <div className="mt-2 grid gap-2 text-sm">
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Amount:</span>
                        <span>${form.getValues("loanAmount")}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Purpose:</span>
                        <span>
                          {form
                            .getValues("loanPurpose")
                            ?.replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Term:</span>
                        <span>
                          {form
                            .getValues("loanTerm")
                            ?.replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">
                          Interest Rate:
                        </span>
                        <span>{form.getValues("interestRate")}%</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">
                          Start Date:
                        </span>
                        <span>
                          {form.getValues("startDate")
                            ? format(form.getValues("startDate"), "PPP")
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Additional Information</h3>
                    <div className="mt-2 grid gap-2 text-sm">
                      {form.getValues("creditScore") && (
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">
                            Credit Score:
                          </span>
                          <span>{form.getValues("creditScore")}</span>
                        </div>
                      )}
                      {form.getValues("annualIncome") && (
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">
                            Annual Income:
                          </span>
                          <span>${form.getValues("annualIncome")}</span>
                        </div>
                      )}
                      {form.getValues("collateral") && (
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">
                            Collateral:
                          </span>
                          <span>{form.getValues("collateral")}</span>
                        </div>
                      )}
                      {form.getValues("additionalNotes") && (
                        <div className="grid grid-cols-1 gap-1">
                          <span className="text-muted-foreground">Notes:</span>
                          <span className="whitespace-pre-wrap">
                            {form.getValues("additionalNotes")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
