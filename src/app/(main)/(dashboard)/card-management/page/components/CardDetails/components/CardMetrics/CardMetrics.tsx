import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DashboardMetric } from "@/app/(main)/(dashboard)/dashboard/page/components";
import { colors } from "@/theme";
import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";
import {
  TCardMetricsResponse,
  useGetCardMetricsQuery,
} from "@/redux/features/card";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";

type CardMetricsProps = {
  cardId: string;
};

export const CardMetrics: React.FC<CardMetricsProps> = React.memo(
  ({ cardId }) => {
    const { data, isLoading, error } = useGetCardMetricsQuery({
      cardId,
      year: CURRENTYEAR,
      monthIndex: CURRENTMONTHINDEX,
      timezone: TIMEZONE,
    });

    const metricsData: TCardMetricsResponse = useMemo(
      () =>
        data?.data || {
          totalTransactions: 0,
          totalBalance: 0,
          monthlySpending: 0,
          monthlyIncome: 0,
        },
      [data]
    );

    const metrics = useMemo(
      () => [
        {
          title: "Total Balance",
          value: `৳${metricsData.totalBalance}`,
          icon: <FaWallet size={28} color={colors.blue500} />,
          bgColor: colors.blue100,
          iconColor: colors.blue500,
        },
        {
          title: "Monthly Spending",
          value: `৳${metricsData.monthlySpending}`,
          icon: <FaChartLine size={28} color={colors.yellow500} />,
          bgColor: colors.yellow100,
          iconColor: colors.yellow500,
        },
        {
          title: "Monthly Income",
          value: `৳${metricsData.monthlyIncome}`,
          icon: <FaMoneyBillWave size={28} color={colors.green500} />,
          bgColor: colors.green100,
          iconColor: colors.green500,
        },
        {
          title: "Monthly Transactions",
          value: `${metricsData.totalTransactions}`,
          icon: <FaExchangeAlt size={28} color={colors.purple500} />,
          bgColor: colors.purple100,
          iconColor: colors.purple500,
        },
      ],
      [
        metricsData.totalBalance,
        metricsData.totalTransactions,
        metricsData.monthlySpending,
        metricsData.monthlyIncome,
      ]
    );

    if (isLoading) {
      return <div className="my-6 text-center">Loading metrics...</div>;
    }

    if (error) {
      return (
        <div className="my-6 text-center text-red-500">
          Failed to load metrics.
        </div>
      );
    }

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
  }
);
