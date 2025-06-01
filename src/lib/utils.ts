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
  switch (term) {
    case "15 days":
      return Number((amount * (1 + interest / 100)).toFixed(2));

    case "1 month":
      return Number((amount * (1 + interest / 100)).toFixed(2));

    case "2 months":
    case "3 months":
    case "6 months":
    case "1 year": {
      const months = {
        "2 months": 2,
        "3 months": 3,
        "6 months": 6,
        "1 year": 12,
      }[term];

      const totalWithInterest = amount * (1 + interest / 100);
      const monthlyPayment = totalWithInterest / months;
      return Number(monthlyPayment.toFixed(2));
    }

    default:
      throw new Error(`Unknown term: ${term}`);
  }
};

export const toE164 = (phone: string): string => {
  if (phone.startsWith("0")) {
    return "+63" + phone.slice(1);
  }
  return phone;
};
