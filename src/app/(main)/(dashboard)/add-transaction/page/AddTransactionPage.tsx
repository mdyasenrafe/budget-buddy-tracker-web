import React from "react";
import { SectionHeader } from "@/components/molecules";
import { AddTransactionForm } from "./components";

export const AddTransactionPage: React.FC = () => {
  return (
    <div className="pt-10 pb-32 lg:pb-10">
      <SectionHeader
        title="Add Transaction"
        description="Keep track of where your money goes by adding transactions. It helps you stay organized and make better financial decisions."
      />

      <div className="p-6 border rounded-lg shadow-lg bg-[#ecf4e9] mt-6 max-w-[900px] w-full mx-auto mb-20">
        <AddTransactionForm />
      </div>
    </div>
  );
};
