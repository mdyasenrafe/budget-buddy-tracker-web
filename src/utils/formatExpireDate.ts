export const formatExpireDate = (date: any) => {
  // Check if the date is a valid Date object
  const parsedDate = new Date(date);

  // If parsedDate is invalid, return a default value or handle the error
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  const monthNames = [
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

  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear().toString().slice(-2); // Get last 2 digits
  return `${month}/${year}`;
};
