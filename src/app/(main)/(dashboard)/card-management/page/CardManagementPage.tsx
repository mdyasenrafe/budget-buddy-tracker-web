"use client";

import { Text } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { CardOverview } from "@/components/organism";
import { useAppSelector } from "@/redux";
import { TUser, getCurrentUser } from "@/redux/features/auth";
import { TCard } from "@/redux/features/cardOverview";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CardsData } from "./data";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const CardManagementPage = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader
        title="Manage Your Bank Cards"
        description="Easily track and manage all your cards in one place. Check your balance, spending, and savings without any hassle."
      />

      <div className="py-20 md:py-10">
        <div className="border p-6 rounded-lg shadow-lg bg-[#ecf4e9] w-full">
          <div className="flex justify-between">
            <Text variant="h4">My Cards</Text>
            <div className="w-[40px] h-[40px] bg-primary rounded-full flex justify-center items-center cursor-pointer">
              <FaPlus color="white" size={24} />
            </div>
          </div>
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 2.5 },
                1600: { slidesPerView: 3.5 },
              }}
              className="mt-4"
            >
              {CardsData.map((card) => (
                <SwiperSlide
                  key={card._id}
                  className="h-full flex items-stretch w-full"
                >
                  <div
                    onClick={() =>
                      setSelectedCardId((prevId) =>
                        prevId === card._id ? null : card._id
                      )
                    }
                    className="cursor-pointer"
                  >
                    <CardOverview
                      activeCard={card}
                      selected={selectedCardId === card._id}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div>blance trend </div>
      </div>
    </div>
  );
};
