import React, { useState, useCallback, useMemo } from "react";
import { Text } from "@/components/atoms";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CardsData } from "../../data";
import { CardOverview } from "@/components/organism";
import { TCard } from "@/redux/features/cardOverview";
import { useRouter } from "next/navigation";

type MyCardProps = {
  selectedCardId: string | null;
  onSelectedCard: (card: TCard) => void;
  cards: TCard[];
};

export const MyCard: React.FC<MyCardProps> = React.memo(
  ({ selectedCardId, onSelectedCard, cards }) => {
    const router = useRouter();
    const swiperBreakpoints = useMemo(
      () => ({
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2.5 },
        1024: { slidesPerView: 2.5 },
        1600: { slidesPerView: 3.5 },
      }),
      []
    );

    const handleAddCardRedirect = () => {
      router.push("/card-management/add-card");
    };

    return (
      <div className="border p-6 rounded-lg shadow-lg bg-[#ecf4e9] w-full">
        <div className="flex justify-between">
          <Text variant="h4">My Cards</Text>
          <div
            className="w-[40px] h-[40px] bg-primary rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleAddCardRedirect}
          >
            <FaPlus color="white" size={24} />
          </div>
        </div>
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={swiperBreakpoints}
            className="mt-4"
          >
            {cards.map((card) => (
              <SwiperSlide
                key={card._id}
                className="h-full flex items-stretch w-full"
              >
                <div
                  onClick={() => onSelectedCard(card)}
                  className="cursor-pointer"
                >
                  <CardOverview
                    activeCard={card}
                    selected={card._id === selectedCardId}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
);
