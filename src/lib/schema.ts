import { z } from "zod";

export const FormSchema = z.object({
  customer_id: z
    .string({
      required_error: "Select a clients name.",
    })
    .min(1, "Select a clients name."),
  value: z.coerce
    .number({
      required_error: "Please input an amount.",
      invalid_type_error: "Amount must be a number.",
    })
    .min(1, "Please input an amount."),
  purpose: z
    .string({ required_error: "Input what's the deal for." })
    .min(1, "Input what's the deal for."),
});

export const formSchema = z.object({
  // Step 1: Borrower Information
  clientId: z.string().optional(),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),

  // Step 2: Loan Details
  loanAmount: z.string().min(1, {
    message: "Loan amount is required.",
  }),
  loanPurpose: z.string({
    required_error: "Please select a loan purpose.",
  }),
  loanTerm: z.string({
    required_error: "Please select a loan term.",
  }),
  interestRate: z.string().min(1, {
    message: "Interest rate is required.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  additionalNotes: z.string().optional(),
});
