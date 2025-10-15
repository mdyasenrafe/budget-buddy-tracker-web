export type TIsoMonth = string & { __brand: "IsoMonth" };

export type TMonthState = {
  month: number;
  year: number;
  iso: TIsoMonth;
  minIso: TIsoMonth;
  maxIso: TIsoMonth;
};
