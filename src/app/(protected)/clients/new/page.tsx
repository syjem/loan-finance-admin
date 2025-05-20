import type { Metadata } from "next";
import { AddClientForm } from "@/app/(protected)/clients/components/add-client-form";

export const metadata: Metadata = {
  title: "Add New Client",
  description: "Add a new client to the system",
};

export default function AddClientPage() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Client</h1>
        <p className="text-muted-foreground">
          Create a new client record in the system
        </p>
      </div>
      <AddClientForm />
    </div>
  );
}
