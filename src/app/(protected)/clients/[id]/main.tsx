import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type Client = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "blacklisted";
  bio: string;
};

export const Main = ({ data }: { data: Client[] }) => {
  return (
    <main className="container border-t border-b py-8">
      {data?.map((client: Client) => (
        <div key={client.id} className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col space-y-5">
            <div className="flex gap-4">
              <Image
                src={client.avatar}
                alt={client.name}
                width={70}
                height={70}
                className="rounded-md"
              />
              <div className="flex flex-col gap-1">
                <Badge className="uppercase">{client.status}</Badge>
                <strong className="text-accent-foreground font-bold text-2xl">
                  {client.name}
                </strong>
                <address className="text-primary font-semibold text-sm">
                  {client.email}
                </address>
              </div>
            </div>
            <p className="text-accent-foreground max-w-sm font-medium">
              {client.bio}
            </p>
          </div>
          <div className="flex-1 self-center sm:self-start space-y-2">
            <div className="flex flex-col">
              <strong className="text-accent-foreground">Phone Number</strong>
              <address className="text-muted-foreground font-semibold text-sm">
                +{client.phone}
              </address>
            </div>
            <div className="flex flex-col">
              <strong className="text-accent-foreground">Addess</strong>
              <address className="text-muted-foreground font-semibold text-sm">
                {client.address}
              </address>
            </div>
            <div className="flex flex-col">
              <strong className="text-accent-foreground">Joined at</strong>
              <span className="text-muted-foreground font-semibold text-sm">
                {formatDate(client.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};
