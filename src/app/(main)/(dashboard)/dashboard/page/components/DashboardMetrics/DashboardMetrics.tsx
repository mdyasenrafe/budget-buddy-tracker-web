import { colors } from "@/theme";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { BiWalletAlt } from "react-icons/bi";
import { FiCreditCard } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChartBar } from "react-icons/tb";
import { DashboardMetric } from "@/components/molecules";

export const DashboardMetrics = () => {
  const dashboardMetrics = [
    {
      title: "Total Balance",
      value: "$12,345",
      icon: <BiWalletAlt size={24} />,
      bgColor: colors.blue100,
      iconColor: colors.blue500,
    },
    {
      title: "Monthly Expenses",
      value: "$3,210",
      icon: <RiMoneyDollarCircleLine size={24} />,
      bgColor: colors.yellow100,
      iconColor: colors.yellow500,
    },
    {
      title: "Remaining Budget",
      value: "$1,245",
      icon: <TbChartBar size={24} />,
      bgColor: colors.green100,
      iconColor: colors.green500,
    },
    {
      title: "Total Cards",
      value: "3 Cards",
      icon: <FiCreditCard size={24} />,
      bgColor: colors.purple100,
      iconColor: colors.purple500,
    },
  ];

  return (
    <div>
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
