import { z } from "zod";
import { formSchema } from "./schema";

export type FormValues = z.infer<typeof formSchema>;

export type ClientInformation = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  companyName: string;
};
