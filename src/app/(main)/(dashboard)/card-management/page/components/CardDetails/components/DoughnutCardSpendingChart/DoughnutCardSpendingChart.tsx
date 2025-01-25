import { ChartCard } from "@/components/molecules";
import { DoughnutChart } from "@/components/molecules/chart";
import { useGetCardSpendingCategoryQuery } from "@/redux/features/card";
import { colors } from "@/theme";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import React, { useMemo } from "react";
import { Legend } from "./components/Legend";
import { Text } from "@/components/atoms";

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
      {spendingData.length > 0 ? (
        <>
          <div className="w-full h-[350px]">
            <DoughnutChart {...doughnutChartData} />
          </div>
          <Legend labels={labels} values={values} bgColors={bgColors} />
        </>
      ) : (
        <div className="text-center p-6 flex items-center justify-center flex-col">
          <Text variant="h4" className="font-semibold text-gray-700">
            No Transactions Added Yet
          </Text>
          <Text className="text-gray-500">
            It looks like you haven’t added any transactions to this card yet.
            Start adding transactions to see your spending breakdown here.
          </Text>
        </div>
      )}
    </ChartCard>
  );
};
