"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { FormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import NewDealsForm from "@/app/(protected)/dashboard/components/new-deals-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const defaultValues = {
  customer_id: "",
  value: 0,
  purpose: "",
};

const NewDeals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const { error } = await supabase.from("transactions").insert(data);
      if (error) throw new Error();
    } catch (error) {
      console.error("Error adding deal: ", error);
    }

    form.reset(defaultValues);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (isDialogOpen) form.reset();
  }, [isDialogOpen, form]);

  return (
    <Dialog
      aria-describedby="new-deals-description"
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button className="cursor-pointer">New Application</Button>
      </DialogTrigger>
      <DialogContent
        id="new-deals-description"
        className="sm:max-w-[425px] bg-muted"
      >
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
        </DialogHeader>
        <NewDealsForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default NewDeals;
