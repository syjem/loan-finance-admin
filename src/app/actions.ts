"use server";

import { FormValues } from "@/lib/types";

export async function createLoanApplication(data: FormValues) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Todo: Save to database
  console.log("Loan application submitted:", data);

  return {
    success: true,
    message: "Loan application submitted successfully",
    data: {
      id: `LOAN-${Math.floor(Math.random() * 10000)}`,
      ...data,
    },
  };
}

export async function createClient(data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Log the data (in a real app, you would save to database)
  console.log("Client created:", data);

  // Return a success response
  return {
    success: true,
    message: "Client created successfully",
    data: {
      id: `CLIENT-${Math.floor(Math.random() * 10000)}`,
      ...data,
    },
  };
}
