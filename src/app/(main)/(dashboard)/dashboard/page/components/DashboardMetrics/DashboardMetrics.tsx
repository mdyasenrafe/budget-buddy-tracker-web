import { colors } from "@/theme";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { BiWalletAlt } from "react-icons/bi";
import { FiCreditCard } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChartBar } from "react-icons/tb";
import { DashboardMetric } from "@/components/molecules";
import { TDashboardMetricRes } from "@/redux/features/dashboard";

type DashboardMetricsProps = TDashboardMetricRes;

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  totalBalance,
  totalCard,
  monthlyIncome,
  monthlySpending,
}) => {
  const dashboardMetrics = [
    {
      title: "Total Balance",
      value: `৳${totalBalance}`,
      icon: <BiWalletAlt size={24} />,
      bgColor: colors.blue100,
      iconColor: colors.blue500,
    },
    {
      title: "Monthly Income",
      value: `৳${monthlyIncome}`,
      icon: <RiMoneyDollarCircleLine size={24} />,
      bgColor: colors.yellow100,
      iconColor: colors.yellow500,
    },
    {
      title: "Monthly Expenses",
      value: `৳${monthlySpending}`,
      icon: <TbChartBar size={24} />,
      bgColor: colors.green100,
      iconColor: colors.green500,
    },
    {
      title: "Total Cards",
      value: `${totalCard}`,
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
