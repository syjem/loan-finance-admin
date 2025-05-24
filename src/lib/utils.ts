import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const getMonthlyPayment = (
  amount: number,
  interest: number,
  term: string
) => {
  let months: number;

  switch (term) {
    case "15 days":
      months = 0.5;
      break;
    case "1 month":
      months = 1;
      break;
    case "2 months":
      months = 2;
      break;
    case "3 months":
      months = 3;
      break;
    case "6 months":
      months = 6;
      break;
    case "1 year":
      months = 12;
      break;
    default:
      throw new Error(`Unknown term: ${term}`);
  }

  const totalWithInterest = amount * (1 + interest / 100);

  const monthlyPayment = totalWithInterest / months;

  return Number(monthlyPayment.toFixed(2));
};
