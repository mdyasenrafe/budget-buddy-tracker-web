"use client";

import React, { useCallback, useState } from "react";
import { SectionHeader } from "@/components/molecules";
import { EmptyCardState, MyCard } from "./components";
import { TCard } from "@/redux/features/cardOverview";
import { colors } from "@/theme";
import { CardDetails } from "./components/CardDetails";
import { useGetCardsQuery } from "@/redux/features/card";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

export const CardManagementPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);
  // hooks
  const { data, isLoading, isFetching } = useGetCardsQuery();

  const handleSelectedCard = useCallback((id: TCard) => {
    setSelectedCard(id);
  }, []);

  return (
    <div>
      <SectionHeader
        title="Manage Your Bank Cards"
        description="Easily track and manage all your cards in one place. Check your balance, spending, and savings without any hassle."
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="py-20 md:py-10">
            <MyCard
              selectedCardId={selectedCard?._id as string}
              onSelectedCard={handleSelectedCard}
              cards={data?.data as TCard[]}
            />
            {!selectedCard ? (
              <EmptyCardState />
            ) : (
              <CardDetails selectedCard={selectedCard} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
