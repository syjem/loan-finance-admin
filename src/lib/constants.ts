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
