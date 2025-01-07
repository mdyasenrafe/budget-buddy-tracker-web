"use client";

import React, { useCallback, useState } from "react";
import { SectionHeader } from "@/components/molecules";
import { EmptyCardState, MyCard } from "./components";
import { TCard } from "@/redux/features/cardOverview";
import { colors } from "@/theme";
import { CardDetails } from "./components/CardDetails";

export const CardManagementPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);

  const handleSelectedCard = useCallback((id: TCard) => {
    setSelectedCard(id);
  }, []);

  return (
    <div>
      <SectionHeader
        title="Manage Your Bank Cards"
        description="Easily track and manage all your cards in one place. Check your balance, spending, and savings without any hassle."
      />
      <div className="py-20 md:py-10">
        <MyCard
          selectedCardId={selectedCard?._id as string}
          onSelectedCard={handleSelectedCard}
        />
        {!selectedCard ? (
          <EmptyCardState />
        ) : (
          <CardDetails selectedCard={selectedCard} />
        )}
      </div>
    </div>
  );
};
