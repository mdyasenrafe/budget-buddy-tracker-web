import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { BudgetDetailCard } from "../BudgetDetailCard";
import { TBudgetDeailsCard } from "../..";

type BudgetDetailSwiperProps = {
  details: TBudgetDeailsCard[];
};

export const BudgetDetailSwiper: React.FC<BudgetDetailSwiperProps> = ({
  details,
}) => {
  return (
    <div className="block lg:hidden">
      <Swiper spaceBetween={16} slidesPerView={1.4}>
        {details.map((detail, index) => (
          <SwiperSlide key={index}>
            <BudgetDetailCard
              label={detail.label}
              value={detail.value}
              className={detail.className}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
