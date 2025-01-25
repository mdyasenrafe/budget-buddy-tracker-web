"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SectionHeader } from "@/components/molecules";
import { MyCard } from "./components";
import { TCard } from "@/redux/features/cardOverview";
import { CardDetails } from "./components/CardDetails";
import { useGetCardsQuery } from "@/redux/features/card";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { EmptyCardState } from "./components/EmptyCardState";

export const CardManagementPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);
  // hooks
  const { data, isLoading, isFetching } = useGetCardsQuery();

  const handleSelectedCard = useCallback((id: TCard) => {
    setSelectedCard(id);
  }, []);

  useEffect(() => {
    if (selectedCard && data?.data) {
      const isCardValid = data?.data.some(
        (card) => card._id === selectedCard._id
      );
      if (!isCardValid) {
        setSelectedCard(null);
      }
    }
  }, [selectedCard, data?.data]);

  return (
    <div>
      <SectionHeader
        title="Manage Your Bank Cards"
        description="Easily track and manage all your cards in one place. Check your balance, spending, and savings without any hassle."
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="py-20 md:py-10">
          {data?.data && data?.data.length !== 0 && (
            <MyCard
              selectedCardId={selectedCard?._id as string}
              onSelectedCard={handleSelectedCard}
              cards={data?.data as TCard[]}
            />
          )}
          {data?.data?.length === 0 ? (
            <EmptyCardState
              title="No Cards Added"
              description="You don't have any cards yet. Add a new card to start tracking your spending and savings."
            />
          ) : !selectedCard ? (
            <EmptyCardState
              title="No Card Selected"
              description="Select a card to view detailed insights about your spending, income, and trends."
            />
          ) : (
            <CardDetails selectedCard={selectedCard} />
          )}
        </div>
      )}
    </div>
  );
};
