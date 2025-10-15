import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import { RootState } from "../../store";
import { TIsoMonth, TMonthState } from "./type";

const MIN_MONTH = dayjs("2025-01-01").startOf("month");
const MAX_MONTH = dayjs().startOf("month");

const toIso = (d: Dayjs): TIsoMonth => d.format("YYYY-MM") as TIsoMonth;
const fromIso = (iso: string): Dayjs => dayjs(`${iso}-01`).startOf("month");
const clamp = (d: Dayjs) => {
  if (d.isBefore(MIN_MONTH, "month")) return MIN_MONTH;
  if (d.isAfter(MAX_MONTH, "month")) return MAX_MONTH;
  return d.startOf("month");
};

const asState = (d: Dayjs): TMonthState => ({
  year: d.year(),
  month: d.month(),
  iso: toIso(d),
  minIso: toIso(MIN_MONTH),
  maxIso: toIso(MAX_MONTH),
});

const initialState: TMonthState = asState(clamp(MAX_MONTH));

const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    /** Set from parts (1-based month accepted for convenience) */
    setMonthYear: (
      state,
      action: PayloadAction<{ year: number; month: number; oneBased?: boolean }>
    ) => {
      const { year, month, oneBased } = action.payload;
      const d = dayjs()
        .year(year)
        .month(oneBased ? month - 1 : month)
        .startOf("month");
      Object.assign(state, asState(clamp(d)));
    },

    /** Set from "YYYY-MM" */
    setFromIso: (state, action: PayloadAction<TIsoMonth | string>) => {
      const d = clamp(fromIso(action.payload as string));
      Object.assign(state, asState(d));
    },

    /** Move by +1/-1 month (clamped) */
    step: (state, action: PayloadAction<1 | -1>) => {
      const d = clamp(fromIso(state.iso).add(action.payload, "month"));
      Object.assign(state, asState(d));
    },

    /** Recompute max bound (e.g. if “today” changes) and re-clamp */
    refreshBounds: (state) => {
      const newMax = dayjs().startOf("month");
      const clamped = clamp(fromIso(state.iso));
      state.maxIso = toIso(newMax);
      Object.assign(state, asState(clamped));
    },
  },
});

export const { setMonthYear, setFromIso, step, refreshBounds } =
  monthSlice.actions;

export const selectMonthState = (s: RootState) => s.month;
export const selectIso = (s: RootState) => s.month.iso;
export const selectYear = (s: RootState) => s.month.year;
export const selectMonthIndex = (s: RootState) => s.month.month;
export const selectBounds = (s: RootState) => ({
  minIso: s.month.minIso,
  maxIso: s.month.maxIso,
});

export const selectDayjs = (s: RootState) => fromIso(s.month.iso);

export default monthSlice.reducer;
