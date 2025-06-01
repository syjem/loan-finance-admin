import { z } from "zod";

export const loanApplicationFormSchema = z.object({
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
  companyName: z.string().optional(),

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

export const loanApplicationFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  startDate: new Date(),
  loanAmount: "",
  interestRate: "3.5",
  additionalNotes: "",
};

export const addClientFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  type: z.string({
    required_error: "Please select a client type.",
  }),
  companyName: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  notes: z.string().optional(),
});

export const addClientDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  address: "",
  notes: "",
};

// ADMINS SIDE
export const addLoanAgentFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),

    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    role: z.enum(["admin", "agent"], {
      required_error: "Please select a role.",
      invalid_type_error: "Invalid role selected.",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 digits.",
    }),
    position: z.string({
      required_error: "Please select a job title.",
    }),
    startDate: z.date({
      required_error: "Start date is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
