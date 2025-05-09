"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CreditCard, GraduationCap, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClientInfo } from "@/hooks/use-client-info";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/lib/schema";
import { getInitials } from "@/lib/utils";

export const purpose = [
  {
    name: "Education",
    icon: <GraduationCap />,
  },
  {
    name: "Personal",
    icon: <User />,
  },
  {
    name: "Business",
    icon: <CreditCard />,
  },
];

type NewDealsFormProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  onSubmit: (data: z.infer<typeof FormSchema>) => Promise<void>;
};

const NewDealsForm = ({ form, onSubmit }: NewDealsFormProps) => {
  const { clients } = useClientInfo();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="customer_id"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center gap-2">
                <FormLabel htmlFor="name" className="text-right">
                  Client:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="name" className="col-span-3 w-full">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src={client.avatar}
                                alt={client.name}
                              />
                              <AvatarFallback className="text-xs">
                                {getInitials(client.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">{client.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center gap-2">
                <FormLabel htmlFor="purpose" className="text-right">
                  Purpose:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="purpose" className="col-span-3 w-full">
                      <SelectValue placeholder="What's the deal for?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {purpose.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.icon}
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center gap-2">
                <FormLabel htmlFor="amount" className="text-right">
                  Amount:
                </FormLabel>
                <FormControl>
                  <Input {...field} id="amount" className="col-span-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="cursor-pointer"
          >
            {form.formState.isSubmitting ? "Adding" : "Add now"}
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin ml-1" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewDealsForm;
