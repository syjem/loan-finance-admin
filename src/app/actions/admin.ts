"use server";

import { addLoanAgentFormSchema } from "@/lib/schema";
import { createAdminClient } from "@/lib/supabase/admin";
import { toE164 } from "@/lib/utils";
import { z } from "zod";

export async function createLoanOfficer(
  formData: z.infer<typeof addLoanAgentFormSchema>
) {
  const supabase = await createAdminClient();

  const fullName = `${formData.firstName} ${formData.lastName}`;
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName
  )}`;
  const user = formData.role === "agent" ? "Agent" : "Admin";

  const { data: createdUser, error } = await supabase.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    phone: toE164(formData.phone),
    email_confirm: true,
    phone_confirm: true,
    user_metadata: {
      full_name: fullName,
      role: formData.role,
      totalLoan: 0,
      position: formData.position,
      start_date: formData.startDate,
      avatar_url: avatarUrl,
    },
  });

  if (error) {
    const errorMessage =
      error.message || `An error has occurred while adding the ${user}.`;

    console.error(error.message);
    return {
      success: false,
      message: errorMessage,
    };
  }

  const userId = createdUser?.user?.id;

  const { error: insertError } = await supabase.from("loan_agents").insert({
    id: userId,
    full_name: fullName,
    email: formData.email,
    phone: formData.phone,
    role: formData.role,
    position: formData.position,
    start_date: formData.startDate,
    avatar_url: avatarUrl,
  });

  if (insertError) {
    console.error(insertError.message);
    await supabase.auth.admin.deleteUser(userId); // rollback
    return {
      success: false,
      message:
        "User created, but failed to save profile. User has been rolled back.",
    };
  }

  // Return a success response
  return {
    success: true,
    message: `${user} created successfully`,
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
