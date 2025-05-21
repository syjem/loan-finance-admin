// Form steps
export const STEPS = [
  {
    id: "step-1",
    name: "Borrower Information",
    fields: [
      "clientId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "companyName",
    ],
  },
  {
    id: "step-2",
    name: "Loan Details",
    fields: [
      "loanAmount",
      "loanPurpose",
      "loanTerm",
      "interestRate",
      "startDate",
    ],
  },
  {
    id: "step-3",
    name: "Review",
    fields: [],
  },
];

export const LOANPURPOSES = [
  "business",
  "personal",
  "educational",
  "medical",
  "others",
];

export const LOANTERMS = [
  "15 days",
  "1 month",
  "2 months",
  "3 months",
  "6 months",
  "1 year",
];
