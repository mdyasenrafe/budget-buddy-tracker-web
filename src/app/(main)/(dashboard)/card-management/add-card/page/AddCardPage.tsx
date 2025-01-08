import { SectionHeader } from "@/components/molecules";
import React from "react";
import { AddCardForm } from "./components";

export const AddCardPage = () => {
  return (
    <div className="pt-10 pb-32 lg:pb-10">
      <SectionHeader
        title="Add a New Card"
        description={
          "Easily add your debit or credit cards to track your spending. This helps you see how much you've spent and plan better."
        }
      />

      <div className="p-6 border rounded-lg shadow-lg bg-[#ecf4e9] mt-6 max-w-[900px] w-full mx-auto">
        <AddCardForm />
      </div>
    </div>
  );
};
