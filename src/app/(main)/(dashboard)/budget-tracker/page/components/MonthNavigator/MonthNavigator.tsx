import React, { memo, useMemo } from "react";
import { Button } from "antd";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";

type MonthNavigatorProps = {
  selectedMonth: string;
  onChange: (month: string) => void;
};

export const MonthNavigator = memo(
  ({ selectedMonth, onChange }: MonthNavigatorProps) => {
    const months = useMemo(
      () =>
        Array.from({ length: 12 }, (_, i) =>
          dayjs().subtract(i, "month").format("MMMM YYYY")
        ),
      []
    );

    const handleChange = (direction: "prev" | "next") => {
      const currentIndex = months.indexOf(selectedMonth);
      const newIndex =
        direction === "prev" ? currentIndex + 1 : currentIndex - 1;
      if (months[newIndex]) {
        onChange(months[newIndex]);
      }
    };

    return (
      <div className="flex justify-between items-center py-5">
        <Button
          type="primary"
          shape="circle"
          icon={<FaChevronLeft />}
          onClick={() => handleChange("prev")}
          // disabled={selectedMonth === months[0]}
        />
        <h4>{selectedMonth}</h4>
        <Button
          type="primary"
          shape="circle"
          icon={<FaChevronRight />}
          onClick={() => handleChange("next")}
          disabled={selectedMonth === dayjs().format("MMMM YYYY")}
        />
      </div>
    );
  }
);
