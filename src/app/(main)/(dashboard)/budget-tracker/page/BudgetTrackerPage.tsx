"use client";

import React, { useState, useCallback, useMemo } from "react";
import { SectionHeader } from "@/components/molecules";
import dayjs from "dayjs";
import { BudgetDetails, BudgetList, MonthNavigator } from "./components";
import { Col, Row } from "antd";
import { TBudget, useGetBudgetQuery } from "@/redux/features/budget";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

export const BudgetTrackerPage = () => {
  // states
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format("MMMM YYYY")
  );
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  // api hooks
  const { isLoading, data } = useGetBudgetQuery(dayjs().month());

  const handleMonthChange = useCallback((month: string) => {
    setSelectedMonth(month);
  }, []);

  const handleBudgetClick = useCallback((name: string) => {
    setSelectedBudget(name);
  }, []);

  const selectedBudgetDetails = useMemo(
    () => data?.data.find((budget) => budget.name === selectedBudget),
    [selectedBudget]
  );

  return (
    <div>
      <SectionHeader
        title="Budget Tracker"
        description="Easily track your expenses, set monthly budgets, and stay on top of your finances with simple charts and progress updates. Keep your spending organized and make better financial decisions effortlessly."
      />

      {/* <MonthNavigator
        selectedMonth={selectedMonth}
        onChange={handleMonthChange}
      /> */}

      <div className="py-10">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <BudgetList
                budgets={data?.data as TBudget[]}
                selectedBudget={selectedBudget}
                onBudgetClick={handleBudgetClick}
              />
            </Col>
            <Col xs={24} md={16}>
              <BudgetDetails budgetDetails={selectedBudgetDetails as TBudget} />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};
