import { Text } from "@/components/atoms";
import { ChartCard } from "@/components/molecules";
import { DoughnutChart } from "@/components/molecules/chart";
import { useGetCardSpendingCategoryQuery } from "@/redux/features/card";
import { colors } from "@/theme";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import React, { useMemo } from "react";

type Props = {
  cardId: string;
};

export const DoughnutCardSpendingChart: React.FC<Props> = ({ cardId }) => {
  const { data, isLoading, isFetching } = useGetCardSpendingCategoryQuery({
    id: cardId,
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const spendingData = (data?.data || []).slice(0, 5);
  const labels = spendingData?.map((item) => item?.label);
  const values = spendingData?.map((item) => item?.amount);
  const bgColors = [
    colors.secondary,
    colors.primaryBase,
    colors.primaryLight1,
    colors.primaryLight2,
    colors.primaryLight3,
  ];

  const doughnutChartData = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: bgColors,
          hoverBackgroundColor: [
            colors.primaryBase,
            colors.primaryDark,
            colors.primaryLight3,
            colors.primaryLight2,
            colors.primaryLight1,
          ],
        },
      ],
    }),
    [labels, values]
  );

  return (
    <ChartCard
      title="Spending Categories"
      className="row-span-2 mt-6 lg:mt-0"
      loading={isFetching || isLoading}
    >
      <div className="w-full h-[350px]">
        <DoughnutChart {...doughnutChartData} />
      </div>
      <div className="mt-4">
        {labels.map((label, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: bgColors[index] }}
              ></div>
              <Text className="text-sm font-medium text-gray-700">{label}</Text>
            </div>
            <Text className="text-sm font-medium text-gray-900">
              ${values[index]?.toFixed(2)}
            </Text>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};
