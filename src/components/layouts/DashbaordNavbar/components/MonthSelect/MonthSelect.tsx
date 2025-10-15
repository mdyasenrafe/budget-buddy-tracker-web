"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, Tooltip } from "antd";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";
import { Text, Button } from "@/components/atoms";

type Props = {
  onChangeMonth?: (month: string) => void;
  className?: string;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// bounds
const MIN_MONTH = dayjs("2025-01-01").startOf("month");
const MAX_MONTH = dayjs().startOf("month");

const clampToBounds = (d: Dayjs) => {
  if (d.isBefore(MIN_MONTH, "month")) return MIN_MONTH;
  if (d.isAfter(MAX_MONTH, "month")) return MAX_MONTH;
  return d.startOf("month");
};

export const MonthSelect: React.FC<Props> = ({ onChangeMonth, className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const initialFromQuery = searchParams.get("month");
  const initial = useMemo(() => {
    const parsed = initialFromQuery ? dayjs(`${initialFromQuery}-01`) : dayjs();
    return clampToBounds(parsed);
  }, [initialFromQuery]);

  const [current, setCurrent] = useState<Dayjs>(initial);
  const [open, setOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setCurrent(initial), [initial]);

  const pushToUrl = (d: Dayjs) => {
    const clamped = clampToBounds(d);
    const monthStr = clamped.format("YYYY-MM");
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("month", monthStr);
    router.replace(`?${params.toString()}`, { scroll: false });
    onChangeMonth?.(monthStr);
  };

  const canGoPrev =
    !current.isSame(MIN_MONTH, "month") && current.isAfter(MIN_MONTH, "month");
  const canGoNext =
    !current.isSame(MAX_MONTH, "month") && current.isBefore(MAX_MONTH, "month");

  const go = (delta: number) => {
    const next = current.add(delta, "month");
    if (delta < 0 && !canGoPrev) return;
    if (delta > 0 && !canGoNext) return;
    const clamped = clampToBounds(next);
    setCurrent(clamped);
    pushToUrl(clamped);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
    if ((e.key === "Enter" || e.key === " ") && !open) {
      setOpen(true);
    }
  };

  const year = current.year();
  const monthIdx = current.month();

  const prevYearDisabled = dayjs(`${year - 1}-12-01`).isBefore(
    MIN_MONTH,
    "month"
  );
  const nextYearDisabled = dayjs(`${year + 1}-01-01`).isAfter(
    MAX_MONTH,
    "month"
  );

  const MonthGrid = (
    <div className="p-2 w-[260px]">
      <div className="flex items-center justify-between mb-2">
        <Button
          aria-label="Previous year"
          disabled={prevYearDisabled}
          className="!p-2 !h-9 !w-9 !rounded-md border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700 flex items-center justify-center"
          onClick={() =>
            !prevYearDisabled && setCurrent((c) => c.subtract(1, "year"))
          }
          icon={<FiChevronLeft />}
        />
        <Text variant="p5" className="font-medium">
          {year}
        </Text>
        <Button
          aria-label="Next year"
          disabled={nextYearDisabled}
          className="!p-2 !h-9 !w-9 !rounded-md border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700 flex items-center justify-center"
          onClick={() =>
            !nextYearDisabled && setCurrent((c) => c.add(1, "year"))
          }
          icon={<FiChevronRight />}
        />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-3 gap-2"
        role="grid"
        aria-label="Choose month"
      >
        {MONTHS.map((m, i) => {
          const candidate = dayjs().year(year).month(i).startOf("month");
          const disabled =
            candidate.isBefore(MIN_MONTH, "month") ||
            candidate.isAfter(MAX_MONTH, "month");
          const selected = candidate.isSame(current, "month");

          return (
            <Button
              key={m}
              aria-pressed={selected}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                const next = clampToBounds(candidate);
                setCurrent(next);
                pushToUrl(next);
                setOpen(false);
              }}
              className={[
                "!py-2 !h-9 !rounded-md !text-sm border w-full",
                selected
                  ? "!bg-gray-900 !text-white !border-gray-900 dark:!bg-gray-100 dark:!text-gray-900 dark:!border-gray-100"
                  : "border-gray-200 hover:!bg-gray-100 dark:border-gray-700 dark:hover:!bg-gray-700",
                disabled
                  ? "disabled:!opacity-50 disabled:!cursor-not-allowed"
                  : "",
              ].join(" ")}
            >
              <Text
                variant="p6"
                className={selected ? "!text-white dark:!text-gray-900" : ""}
              >
                {m}
              </Text>
            </Button>
          );
        })}
      </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <div
      className={["flex items-center gap-2", className].join(" ")}
      onKeyDown={handleKey}
    >
      <Tooltip title="Previous month (←)">
        <Button
          aria-label="Previous month"
          disabled={!canGoPrev}
          onClick={() => go(-1)}
          className="!h-9 !w-9 !rounded-full border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700 flex items-center justify-center"
          icon={<FiChevronLeft />}
        />
      </Tooltip>

      <Popover
        open={open}
        onOpenChange={setOpen}
        content={MonthGrid}
        trigger={["click"]}
        placement="bottom"
        overlayInnerStyle={{ padding: 0 }}
      >
        <Button
          aria-haspopup="dialog"
          aria-expanded={open}
          className="!h-9 !px-3 !rounded-full border border-gray-200 dark:border-gray-700 flex items-center gap-2 hover:!bg-gray-50 dark:hover:!bg-gray-700"
        >
          <FiCalendar className="opacity-80" />
          <Text variant="p5" className="!font-medium">
            {current.format("MMM YYYY")}
          </Text>
          <FiChevronDown className="opacity-80" />
        </Button>
      </Popover>

      <Tooltip title="Next month (→)">
        <Button
          aria-label="Next month"
          disabled={!canGoNext}
          onClick={() => go(1)}
          className="!h-9 !w-9 !rounded-full border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700 flex items-center justify-center"
          icon={<FiChevronRight />}
        />
      </Tooltip>
    </div>
  );
};
