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

export function formatFieldValue(value: Date | undefined | null): string {
  if (!value) return "";

  const day = value.getDate();
  const month = value.toLocaleString("en-US", { month: "short" });
  const year = value.getFullYear();

  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${getDaySuffix(day)}, ${year}`;
}

export function getMonthAbbreviation(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
}

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

export function getPaginationPages(
  current: number,
  total: number
): (number | "...")[] {
  const pages: (number | "...")[] = [];

  // Show all pages if total is 5 or fewer
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Always show the first page
  pages.push(1);

  // Show ellipsis if needed before current - 1
  if (current > 3) {
    pages.push("...");
  }

  // Show middle pages around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Show ellipsis if needed after current + 1
  if (current < total - 2) {
    pages.push("...");
  }

  // Always show the last page
  pages.push(total);

  return pages;
}
