export type TDashbaordParams = {
  year: number;
  monthIndex: number;
  timezone: string;
};

export type TDashboardMetricRes = {
  totalBalance: number;
  monthlySpending: number;
  monthlyIncome: number;
  totalCard: number;
};
