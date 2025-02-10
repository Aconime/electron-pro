export const incrementDateByYears = (date: Date, value: number = 1): Date => {
  date.setFullYear(date.getFullYear() + value);
  return date;
};

export const incrementDateByMonths = (date: Date, value: number = 1): Date => {
  date.setMonth(date.getMonth() + value);
  return date;
};

export const incrementDateByWeeks = (date: Date, value: number = 1): Date => {
  const calculateWeeks = value * 7;
  date.setDate(date.getDate() + calculateWeeks);
  return date;
};

export const incrementDateByDays = (date: Date, value: number = 1): Date => {
  date.setDate(date.getDate() + value);
  return date;
};

export const getUTCDateString = (date: Date) => {
  const localDate = new Date(date);

  const localTimestamp = localDate.getTime();
  const offsetInMillis = localDate.getTimezoneOffset() * 60 * 1000;
  const utcTimestamp = localTimestamp - offsetInMillis;
  const utcDate = new Date(utcTimestamp);

  utcDate.setHours(0, 0, 0, 0);

  return utcDate.toDateString();
};

export const normalizeDateForDatabase = (date: Date): string => {
  return new Date(date).toISOString().split("T")[0] + "T00:00:00.000Z";
};

export const getTimeHMS = (date: Date): string => {
  const localDate = new Date(date);

  let hours = localDate.getHours();
  const minutes = localDate.getMinutes().toString().padStart(2, "0");
  const seconds = localDate.getSeconds().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

export const getTimeDiff = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} years ago`;
};

export const getFutureTimestamp = (days: number) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return Math.floor(futureDate.getTime() / 1000);
};

export const getNextMonthTimestamp = (timestamp: number): number => {
  const date = new Date(timestamp * 1000);
  const originalDay = date.getDate();

  date.setMonth(date.getMonth() + 1);

  if (date.getDate() < originalDay) date.setDate(0);

  return Math.floor(date.getTime() / 1000);
};

// FORMATS
export const formatDateToDDMMYYYY = (
  date: Date,
  lang: string = "en-GB"
): string => {
  return new Date(date).toLocaleDateString(lang, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatMMDDYYYYToDate = (inputDate: string) => {
  const dateString = inputDate;
  const [day, month, year] = dateString.split("/");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    0,
    0,
    0,
    0
  );

  return date;
};

type FormatDateToReadableProps = {
  includeYear: boolean;
};

export const formatDateToReadable = (
  inputDate: string | Date,
  options: FormatDateToReadableProps = {
    includeYear: true,
  }
): string => {
  const months: string[] = [
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

  const date =
    inputDate instanceof Date ? formatDateToDDMMYYYY(inputDate) : inputDate;

  const [day, month, year]: number[] = date.split("/").map(Number);

  const daySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  let formattedDate: string = "";
  let formattedYear: string = "";

  if (options.includeYear) {
    formattedYear = `, ${year}`;
  }

  formattedDate = `${day}${daySuffix(day)} ${
    months[month - 1]
  }${formattedYear}`;

  return formattedDate;
};

export const formatReadableToDate = (readableDate: string): Date | null => {
  const regex = /^(\d+)(st|nd|rd|th),\s*(\w+),\s*(\d{4})$/;

  const match = readableDate.match(regex);

  if (!match) {
    console.error("Invalid readable date format");
    return null;
  }

  const day = parseInt(match[1], 10);
  const monthStr = match[3];
  const year = parseInt(match[4], 10);

  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const monthIndex = months[monthStr];

  if (isNaN(monthIndex)) {
    console.error("Invalid month");
    return null;
  }

  const date = new Date(year, monthIndex, day, 0, 0, 0, 0);
  return date;
};

export const extractDataFromDate = (
  extract: "none" | "day" | "dateDay" | "month",
  date: Date
): string => {
  switch (extract) {
    case "day":
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeek = daysOfWeek[date.getDay()];
      return dayOfWeek;

    case "dateDay":
      const dayOfMonth = date.getDate();
      let dayWithOrdinal;
      if (dayOfMonth >= 11 && dayOfMonth <= 13) {
        dayWithOrdinal = `${dayOfMonth}th`;
      } else {
        const lastDigit = dayOfMonth % 10;
        switch (lastDigit) {
          case 1:
            dayWithOrdinal = `${dayOfMonth}st`;
            break;
          case 2:
            dayWithOrdinal = `${dayOfMonth}nd`;
            break;
          case 3:
            dayWithOrdinal = `${dayOfMonth}rd`;
            break;
          default:
            dayWithOrdinal = `${dayOfMonth}th`;
        }
      }
      return dayWithOrdinal;

    case "month":
      const months = [
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
      const monthName = months[date.getMonth()];
      return monthName;
    default:
      return "";
  }
};

export const isDateOverdue = (date: Date): boolean => {
  return new Date(date).getTime() < new Date().getTime();
};
