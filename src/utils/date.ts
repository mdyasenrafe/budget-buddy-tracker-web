import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const CURRENTMONTHINDEX = dayjs().month();
export const CURRENTYEAR = dayjs().year();

export const getMonthStart = (timezone: string = "UTC"): string => {
  return dayjs().tz(timezone).startOf("month").toISOString();
};

export const getMonthEnd = (timezone: string = "UTC"): string => {
  return dayjs().endOf("month").tz(timezone).toISOString();
};
