"use client";

import React from "react";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import { CardOverview } from "@/components/organism";
import { dashboardMetrics } from "./constant";
import { getCateogryLoadingState } from "@/redux/features/category";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DashboardMetric } from "@/components/molecules";

export const DashboardPage = () => {
  const activeCard = useAppSelector(selectCard);
  const isLoading = useAppSelector(getCateogryLoadingState);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      {activeCard && (
        <div>
          <CardOverview
            activeCard={activeCard as TCard}
            selected={true}
            showEdit={false}
          />
        </div>
      )}
      <div className="lg:hidden">
        <Swiper spaceBetween={16} slidesPerView={1.4}>
          {dashboardMetrics.map((metric, index) => (
            <SwiperSlide key={index}>
              <DashboardMetric
                key={index}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                bgColor={metric.bgColor}
                iconColor={metric.iconColor}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hidden lg:grid">
        {dashboardMetrics.map((metric, index) => (
          <DashboardMetric
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            bgColor={metric.bgColor}
            iconColor={metric.iconColor}
          />
        ))}
      </div>
    </div>
  );
};
