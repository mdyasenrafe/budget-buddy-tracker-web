"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Popover, Tooltip } from "antd";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";
import { Text, Button } from "@/components/atoms";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  selectDayjs as selectCurrentDayjs,
  selectBounds,
  setFromIso,
  step,
} from "@/redux/features/month";

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

/** Helper: clamp a date within [min,max] at month precision */
const clampMonth = (d: Dayjs, min: Dayjs, max: Dayjs) => {
  const s = d.startOf("month");
  if (s.isBefore(min, "month")) return min.startOf("month");
  if (s.isAfter(max, "month")) return max.startOf("month");
  return s;
};

export const MonthSelect: React.FC<Props> = ({ onChangeMonth, className }) => {
  const dispatch = useAppDispatch();

  // Global month from store (authoritative)
  const current = useAppSelector(selectCurrentDayjs);
  const { minIso, maxIso } = useAppSelector(selectBounds);
  const min = useMemo(() => dayjs(`${minIso}-01`).startOf("month"), [minIso]);
  const max = useMemo(() => dayjs(`${maxIso}-01`).startOf("month"), [maxIso]);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Dayjs>(current);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) setView(current);
  }, [current, open]);

  const canGoPrev = current.isAfter(min, "month");
  const canGoNext = current.isBefore(max, "month");

  const onChange = (d: Dayjs) => {
    const clamped = clampMonth(d, min, max);
    const iso = clamped.format("YYYY-MM");
    dispatch(setFromIso(iso));
    onChangeMonth?.(iso);
  };

  const go = (delta: -1 | 1) => {
    if (delta < 0 && !canGoPrev) return;
    if (delta > 0 && !canGoNext) return;
    dispatch(step(delta));
    const next = clampMonth(current.add(delta, "month"), min, max);
    onChangeMonth?.(next.format("YYYY-MM"));
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
    if ((e.key === "Enter" || e.key === " ") && !open) setOpen(true);
  };

  const year = view.year();
  const prevYearDisabled = dayjs(`${year - 1}-12-01`).isBefore(min, "month");
  const nextYearDisabled = dayjs(`${year + 1}-01-01`).isAfter(max, "month");

  const MonthGrid = (
    <div className="p-2 w-[260px]">
      <div className="flex items-center justify-between mb-2">
        <Button
          aria-label="Previous year"
          disabled={prevYearDisabled}
          className="!p-2 !h-9 !w-9 !rounded-md border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700 flex items-center justify-center "
          onClick={() =>
            !prevYearDisabled && setView((v) => v.subtract(1, "year"))
          }
          icon={<FiChevronLeft />}
        />
        <Text variant="p5" className="font-medium">
          {year}
        </Text>
        <Button
          aria-label="Next year"
          disabled={nextYearDisabled}
          className="!p-2 !h-9 !w-9 !rounded-md border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700flex items-center justify-center"
          onClick={() => !nextYearDisabled && setView((v) => v.add(1, "year"))}
          icon={<FiChevronRight />}
        />
      </div>

      <div
        className="grid grid-cols-3 gap-2"
        role="grid"
        aria-label="Choose month"
      >
        {MONTHS.map((m, i) => {
          const candidate = view.year(year).month(i).startOf("month");
          const disabled =
            candidate.isBefore(min, "month") || candidate.isAfter(max, "month");
          const selected = candidate.isSame(current, "month");

          return (
            <Button
              key={m}
              aria-pressed={selected}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onChange(candidate);
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
      <div className="hidden md:flex">
        <Tooltip title="Previous month (←)">
          <Button
            aria-label="Previous month"
            disabled={!canGoPrev}
            onClick={() => go(-1)}
            className="!h-9 !w-9 !rounded-full border border-gray-200 hover:!bg-gray-100 disabled:!opacity-50 dark:border-gray-700 dark:hover:!bg-gray-700  lg:flex items-center justify-center"
            icon={<FiChevronLeft />}
          />
        </Tooltip>
      </div>

      <Popover
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (o) setView(current); // reset view to current when opening
        }}
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

      <div className="hidden md:flex">
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
    </div>
  );
};
