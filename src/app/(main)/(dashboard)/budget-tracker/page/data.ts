export type TBudget = {
  limit: number;
  category: string;
  name: string;
  spend: number;
};

export const filteredBudgetData: TBudget[] = [
  {
    limit: 750,
    category: "Groceries",
    name: "Food & Household",
    spend: 767,
  },
  {
    limit: 500,
    category: "Utilities",
    name: "Electricity, Water, Internet",
    spend: 450,
  },
  {
    limit: 250,
    category: "Healthcare",
    name: "Medical & Insurance",
    spend: 200,
  },
  {
    limit: 500,
    category: "Transportation",
    name: "Commute & Fuel",
    spend: 400,
  },
  {
    limit: 500,
    category: "Education",
    name: "Learning & Courses",
    spend: 300,
  },
  {
    limit: 500,
    category: "Shopping",
    name: "Clothing & Personal Items",
    spend: 450,
  },
  {
    limit: 250,
    category: "Dining Out",
    name: "Restaurants & Takeout",
    spend: 200,
  },
  {
    limit: 250,
    category: "Entertainment",
    name: "Movies, Games, Concerts",
    spend: 150,
  },
  {
    limit: 500,
    category: "Travel",
    name: "Trips & Getaways",
    spend: 400,
  },
  {
    limit: 400,
    category: "Recurring Expenses",
    name: "Monthly Subscriptions",
    spend: 350,
  },
  {
    limit: 300,
    category: "Childcare",
    name: "Daycare & Babysitting",
    spend: 250,
  },
  {
    limit: 400,
    category: "Home Maintenance",
    name: "Repairs & Renovations",
    spend: 300,
  },
  {
    limit: 200,
    category: "Personal Care",
    name: "Grooming & Beauty",
    spend: 150,
  },
  {
    limit: 300,
    category: "Debt Payments",
    name: "Loan & Credit Card Payments",
    spend: 250,
  },
  {
    limit: 250,
    category: "Insurance",
    name: "Health, Vehicle & Home Insurance",
    spend: 200,
  },
  {
    limit: 400,
    category: "Emergency Fund",
    name: "Savings for Unexpected Expenses",
    spend: 300,
  },
  {
    limit: 200,
    category: "Charity/Donations",
    name: "Support for Causes",
    spend: 150,
  },
  {
    limit: 500,
    category: "Miscellaneous",
    name: "Unplanned Expenses",
    spend: 350,
  },
  {
    limit: 300,
    category: "Other",
    name: "Catch-All Category",
    spend: 250,
  },
  {
    limit: 600,
    category: "Gifts",
    name: "Holiday & Birthday Gifts",
    spend: 450,
  },
  {
    limit: 700,
    category: "Side Hustles",
    name: "Freelance & Part-Time Work Expenses",
    spend: 550,
  },
  {
    limit: 800,
    category: "Investments",
    name: "Stocks, Bonds & Mutual Funds",
    spend: 700,
  },
  {
    limit: 1000,
    category: "Salary",
    name: "Income from Primary Job",
    spend: 800,
  },
  {
    limit: 400,
    category: "other_income",
    name: "Miscellaneous Income Sources",
    spend: 300,
  },
];
