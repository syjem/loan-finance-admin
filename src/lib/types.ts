import { z } from "zod";
import { loanApplicationFormSchema } from "./schema";

export type FormValues = z.infer<typeof loanApplicationFormSchema>;

export type ClientInformation = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  companyName: string;
};

export type CLientType = {
  id: string;
  created_at: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  avatar: string;
  status: "active" | "inactive";
  type: "individual" | "business";
  loans: [{ id: string; created_at: string; amount: number }];
};

type Client = {
  id: string;
  type: "individual" | "business";
  email: string;
  notes: string | null;
  avatar: string;
  status: "active" | "inactive";
  address: string;
  lastName: string;
  firstName: string;
  created_at: string;
  companyName: string | null;
  phoneNumber: string;
};

export type Loan = {
  id: number;
  created_at: string;
  client_id: string;
  purpose: string;
  amount: number;
  term: string;
  notes: string;
  interest_rate: number;
  status: "active" | "overdue" | "completed";
  clients: Client;
};
