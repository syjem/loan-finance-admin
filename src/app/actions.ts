"use server";

import { FormValues } from "@/lib/types";

export async function createLoanApplication(data: FormValues) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

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
