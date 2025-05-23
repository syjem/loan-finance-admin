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
