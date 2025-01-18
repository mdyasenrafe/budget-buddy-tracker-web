import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { TBudgetDeailsCard } from "../..";
import { DashboardMetric } from "@/app/(main)/(dashboard)/dashboard/page/components";

type BudgetDetailSwiperProps = {
  details: TBudgetDeailsCard[];
};

export const BudgetDetailSwiper: React.FC<BudgetDetailSwiperProps> = ({
  details,
}) => {
  return (
    <div className="block lg:hidden">
      <Swiper spaceBetween={16} slidesPerView={1.4}>
        {details.map((metric, index) => (
          <SwiperSlide key={index}>
            <DashboardMetric
              key={index}
              title={metric.label}
              value={metric.value}
              icon={metric.icon}
              bgColor={metric.bgColor}
              iconColor={metric.iconColor}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
