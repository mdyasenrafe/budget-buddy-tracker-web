import { SectionHeader } from "@/components/molecules";
import React from "react";
import { EditCardForm } from "./components";

type EditCardPageProps = {
  cardId: string;
};

export const EditCardPage: React.FC<EditCardPageProps> = () => {
  return (
    <div className="pt-10 pb-32 lg:pb-10">
      <SectionHeader
        title="Edit Your Card Details"
        description={
          "Easily manage your debit or credit cards to keep track of spending and stay on top of your finances. Edit card information, monitor spending insights, and ensure all your financial tools are in one place for smarter budgeting."
        }
      />

      <div className="p-6 border rounded-lg shadow-lg bg-[#ecf4e9] mt-6 max-w-[900px] w-full mx-auto">
        <EditCardForm />
      </div>
    </div>
  );
};
