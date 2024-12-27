"use client";

import { CardOverview } from "@/components/molecules";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import React from "react";

export const DashboardPage = () => {
  const activeCard = useAppSelector(selectCard);
  return (
    <div>{activeCard && <CardOverview activeCard={activeCard as TCard} />}</div>
  );
};
