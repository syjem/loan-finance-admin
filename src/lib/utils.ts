import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CLientType } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .splice(0, 2)
    .map((item) => item[0])
    .join("");
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatted;
};

export const getClientsThisMonth = (clients: CLientType[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return clients.filter((client) => {
    const createdAt = new Date(client.created_at);
    return (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear
    );
  }).length;
};
