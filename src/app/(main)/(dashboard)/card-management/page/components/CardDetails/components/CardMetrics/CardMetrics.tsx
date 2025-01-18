import { DashboardMetric } from "@/app/(main)/(dashboard)/dashboard/page/components";
import React from "react";
import { colors } from "@/theme";
import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export const CardMetrics = () => {
  const metrics = [
    {
      title: "Total Balance",
      value: "৳69,000",
      icon: <FaWallet size={28} color={colors.blue500} />,
      bgColor: colors.blue100,
      iconColor: colors.blue500,
    },
    {
      title: "Monthly Spending",
      value: "৳10,000",
      icon: <FaChartLine size={28} color={colors.yellow500} />,
      bgColor: colors.yellow100,
      iconColor: colors.yellow500,
    },
    {
      title: "Monthly Income",
      value: "৳15,000",
      icon: <FaMoneyBillWave size={28} color={colors.green500} />,
      bgColor: colors.green100,
      iconColor: colors.green500,
    },
    {
      title: "Monthly Transactions",
      value: "25",
      icon: <FaExchangeAlt size={28} color={colors.purple500} />,
      bgColor: colors.purple100,
      iconColor: colors.purple500,
    },
  ];

  return (
    <div className="my-6">
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.3}
          breakpoints={{
            768: {
              slidesPerView: 2.3,
            },
          }}
        >
          {metrics.map((metric, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <DashboardMetric
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

      <div className="hidden lg:grid grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
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
