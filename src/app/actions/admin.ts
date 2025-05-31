"use server";

import { addLoanAgentFormSchema } from "@/lib/schema";
import { createAdminClient } from "@/lib/supabase/admin";
import { z } from "zod";

export async function createLoanOfficer(
  formData: z.infer<typeof addLoanAgentFormSchema>
) {
  const supabase = await createAdminClient();

  const fullName = `${formData.firstName} ${formData.lastName}`;

  const { data, error } = await supabase.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    user_metadata: {
      full_name: fullName,
      role: "admin",
      position: formData.position,
      start_date: formData.startDate,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        fullName
      )}`,
    },
  });

  if (error) {
    console.error(error.message);
    return {
      success: false,
      message:
        error.message || "An error has occured while adding the loan officer.",
    };
  }

  console.log("User created:", data);

  // Return a success response
  return {
    success: true,
    message: "Loan officer created successfully",
  };
}

// export async function updateLoanOfficer(officerId: string, data: any) {
//   console.log(`Loan officer ${officerId} updated:`, data);

//   // Return a success response
//   return {
//     success: true,
//     message: "Loan officer updated successfully",
//     data: {
//       officerId,
//       ...data,
//     },
//   };
// }

export async function deleteLoanOfficer(officerId: string) {
  console.log(`Loan officer ${officerId} deleted`);

  // Return a success response
  return {
    success: true,
    message: "Loan officer deleted successfully",
    data: {
      officerId,
    },
  };
}
