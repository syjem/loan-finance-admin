"use server";

import { createClient } from "@/lib/supabase/server";
import { FormValues } from "@/lib/types";
import { AddClientFormValues } from "@/app/(protected)/clients/components/add-client-form";
import { LoanEditFormValues } from "@/app/(protected)/loans/components/loan-edit-form";

export const createLoanApplication = async (formData: FormValues) => {
  console.log(formData);
  const supabase = await createClient();

  if (formData.clientId) {
    const loanData = {
      client_id: formData.clientId,
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

  // if no clientId, call rpc("create_client_and_loan") to create the client first then add the loan
  const { error } = await supabase.rpc("create_client_and_loan", {
    p_amount: parseInt(formData.loanAmount, 10),
    p_company: formData.companyName || null,
    p_email: formData.email,
    p_first_name: formData.firstName,
    p_interest_rate: parseFloat(formData.interestRate),
    p_last_name: formData.lastName,
    p_notes: formData.additionalNotes,
    p_phone: formData.phone,
    p_purpose: formData.loanPurpose,
    p_term: formData.loanTerm,
  });

  if (error) {
    console.error(error.message + " " + error.details); // debugging
    return {
      success: false,
      message: "An error occurred while submitting the loan application.",
      error,
    };
  }

  return {
    success: true,
    message: "Client created and loan submitted successfully.",
  };
};

export async function addClient(data: AddClientFormValues) {
  const supabase = await createClient();

  const { error } = await supabase.from(`clients`).insert(data);

  if (error) {
    console.error(error.message + " " + error.details); // debugging
    return {
      success: false,
      message: "An error occurred while adding the client.",
      error,
    };
  }

  // Return a success response
  return {
    success: true,
    message: "Client created successfully",
  };
}

export const updateLoan = async (id: number, data: LoanEditFormValues) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("loans")
    .update({
      amount: data.amount,
      purpose: data.purpose,
      term: data.term,
      interest_rate: data.interest_rate,
      created_at: data.created_at,
      notes: data?.notes,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `Failed to update loan, please try again.`,
    };
  }

  return {
    success: true,
    message: `Loan successfully updated.`,
  };
};

export async function updateLoanStatus(id: number, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("loans")
    .update({ status: status })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `Failed to update status, please try again.`,
    };
  }

  // Return a success response
  return {
    success: true,
    message: `Status successfully updated to ${status}.`,
  };
}

export async function deleteLoan(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("loans").delete().eq("id", id).select();

  if (error) {
    return {
      success: false,
      message: `Failed to delete loan, please try again.`,
    };
  }

  // Return a success response
  return {
    success: true,
    message: "Loan deleted successfully",
  };
}
