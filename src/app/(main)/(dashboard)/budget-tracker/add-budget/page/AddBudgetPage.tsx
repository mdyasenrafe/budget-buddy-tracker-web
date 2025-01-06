import { Text } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import React from "react";
import { AddBudgetForm } from "./components";

export const AddBudgetPage = () => {
  return (
    <div className="pt-10 pb-32 lg:pb-10">
      <SectionHeader
        title="Add Your Budget"
        description={
          "Set up your monthly spending limits and organize your expenses into categories. Keep track of your spending and carry over any leftover money to the next month. Start managing your money easily and effectively."
        }
      />

      <div className="p-6 border rounded-lg shadow-lg bg-[#ecf4e9] mt-6 max-w-[900px] w-full mx-auto">
        <AddBudgetForm />
      </div>
    </div>
  );
};
