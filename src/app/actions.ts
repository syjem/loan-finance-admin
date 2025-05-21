"use server";

import { createClient } from "@/lib/supabase/server";
import { FormValues } from "@/lib/types";

export const createLoanApplication = async (formData: FormValues) => {
  const supabase = await createClient();

  if (formData.client_id) {
    const loanData = {
      client_id: formData.client_id,
      purpose: formData.loanPurpose,
      amount: parseInt(formData.loanAmount, 10),
      term: formData.loanTerm,
      notes: formData.additionalNotes,
      interest_rate: parseFloat(formData.interestRate),
    };

    const { error } = await supabase.from("loans").insert(loanData);

    if (error) {
      return {
        success: false,
        message: "Failed to submit loan.",
        error,
      };
    }

    return {
      success: true,
      message: "Loan submitted successfully.",
    };
  }

  // No clientId - use transaction for new client + loan
  const { error } = await supabase.rpc("create_client_and_loan", {
    p_amount: parseInt(formData.loanAmount, 10),
    p_company: formData.companyName || null,
    p_email: formData.email,
    p_first_name: formData.firstName,
    p_interest_rate: parseFloat(formData.interestRate),
    p_last_name: formData.lastName,
    p_notes: formData.additionalNotes,
    p_phone: formData.phoneNumber,
    p_purpose: formData.loanPurpose,
    p_term: formData.loanTerm,
  });

  if (error) {
    console.error(error.message + " " + error.details);
    return {
      success: false,
      message: error.message,
      error,
    };
  }

  return {
    success: true,
    message: "Client and loan submitted successfully.",
  };
};

export async function addClient(data: any) {
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
