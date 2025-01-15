import dayjs from "dayjs";

export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const CURRENTMONTHINDEX = dayjs().month();
export const CURRENTYEAR = dayjs().year();
