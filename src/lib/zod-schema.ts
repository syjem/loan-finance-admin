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
  title: z
    .string({ required_error: "Input what's the deal for." })
    .min(1, "Input what's the deal for."),
});
