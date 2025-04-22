import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import supabase from "@/supabase-client";
import { FormSchema } from "@/lib/zod-schema";
import NewDealsForm from "@/components/new-deals-form";

const defaultValues = {
  customer_id: "",
  value: 0,
  title: "",
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
        <Button variant="link" className="cursor-pointer">
          New Deals
        </Button>
      </DialogTrigger>
      <DialogContent id="new-deals-description" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
        </DialogHeader>
        <NewDealsForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default NewDeals;
