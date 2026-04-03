import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectMonthIndex, selectYear } from "@/redux/features/month/monthSlice";
import { useGetSpendingAnalyticsQuery, useGetIncomeAnalyticsQuery } from "@/redux/features/analytics";
import { colors } from "@/theme/colors";
import { TIMEZONE } from "@/utils";

export type CategoryType = "income" | "expense";

export const formatCurrency = (value: number) => `৳${value.toLocaleString()}`;

const CHART_COLORS = [
  colors.primaryBase,
  colors.secondary,
  colors.orangePeel,
  colors.red,
  colors.purple500,
  colors.yellow500,
  colors.blue500,
  colors.green500,
  colors.primaryLight2,
];

export const useCategoryAnalytics = (type: CategoryType) => {
  const monthIndex = useSelector(selectMonthIndex);
  const year = useSelector(selectYear);

  const queryParams = {
    year,
    monthIndex,
    timezone: TIMEZONE,
  };

  const spendingQuery = useGetSpendingAnalyticsQuery(queryParams, { skip: type !== "expense" });
  const incomeQuery = useGetIncomeAnalyticsQuery(queryParams, { skip: type !== "income" });

  const apiData = type === "expense" ? spendingQuery.data : incomeQuery.data;
  const isLoading = type === "expense" ? spendingQuery.isLoading : incomeQuery.isLoading;

  const mockData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const categoryColors: string[] = [];

    const categories = apiData?.data?.categories || [];
    categories.forEach((cat, index) => {
      labels.push(cat.label);
      data.push(cat.totalAmount);
      categoryColors.push(CHART_COLORS[index % CHART_COLORS.length]);
    });

    return {
      labels,
      data,
      colors: categoryColors,
    };
  }, [apiData]);

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  // Sync selected labels when data arrives
  useEffect(() => {
    if (mockData.labels.length > 0 && selectedLabels.length === 0) {
      setSelectedLabels(mockData.labels);
    }
  }, [mockData.labels]);

  const filteredData = useMemo(() => {
    const indices = mockData.labels
      .map((label, index) => (selectedLabels.includes(label) ? index : -1))
      .filter((index) => index !== -1);

    const labels = indices.map((i) => mockData.labels[i]);
    const values = indices.map((i) => mockData.data[i]);
    const backgroundColor = indices.map((i) => mockData.colors[i]);

    return {
      labels,
      values,
      datasets: [
        {
          label: type === "expense" ? "Expenses" : "Income",
          data: values,
          backgroundColor,
          hoverBackgroundColor: backgroundColor,
          borderWidth: 0,
          cutout: "68%",
        },
      ],
    };
  }, [mockData, selectedLabels, type]);

  const totalAmount = useMemo(() => {
    return filteredData.values.reduce((acc, curr) => acc + curr, 0);
  }, [filteredData.values]);

  const toggleCategory = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const resetFilters = () => setSelectedLabels(mockData.labels);

  return {
    mockData,
    selectedLabels,
    filteredData,
    totalAmount,
    toggleCategory,
    resetFilters,
    formatCurrency,
    isLoading,
  };
};
