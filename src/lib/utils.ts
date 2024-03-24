import type { Room } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { isEqual } from "lodash";
import { twMerge } from "tailwind-merge";

import type { TimeTable } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateDateRange(startDate: Date, endDate: Date): Date[] {
  const dateRange: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateRange;
}

export function getTimeTableDates(timetable: TimeTable) {
  const examDates: string[] = [];
  Object.keys(timetable).map((year: string) => {
    Object.keys(timetable?.[year] ?? {}).map((department: string) => {
      Object.keys(timetable?.[year]?.[department] ?? {}).map((date) => {
        if (
          !examDates.includes(date) &&
          timetable?.[year]?.[department]?.[date] !== ""
        ) {
          examDates.push(date);
        }
      });
    });
  });
  return examDates;
}

export function getSuffix(year: number) {
  year = Number(year.toString().slice(-1));
  switch (year) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getNumberNames(number: number) {
  switch (number) {
    case 0:
      return "Ground";
    case 1:
      return "First";
    case 2:
      return "Second";
    case 3:
      return "Third";
    case 4:
      return "Fourth";
    default:
      return "Unknown";
  }
}

export function getTimeTableBasedOnDays(timetable: TimeTable) {
  const timeTableBasedOnDays: Record<string, string[]> = {};
  Object.keys(timetable).map((year) => {
    Object.keys(timetable[year] ?? {}).map((department) => {
      Object.keys(timetable[year]?.[department] ?? {}).map((date) => {
        if (!timeTableBasedOnDays[date]) {
          timeTableBasedOnDays[date] = [];
        }
        timetable[year]?.[department]?.[date] !== ""
          ? timeTableBasedOnDays[date]?.push(`${department} ${year}`)
          : null;
      });
    });
  });
  return timeTableBasedOnDays;
}

export function findDateRangesWithDifferences(
  timeTableBasedOnDays: Record<string, string[]>,
): [string, string][] {
  const dates = Object.keys(timeTableBasedOnDays);
  const dateRanges: [string, string][] = [];

  let currentRange: [string, string] | null = null;

  for (let i = 0; i < dates.length; i++) {
    const currentDate = dates[i] ?? "";
    const currentTimetable = timeTableBasedOnDays[currentDate];

    if (i === 0) {
      currentRange = [currentDate, currentDate];
    } else {
      const prevDate = dates[i - 1] ?? "";
      const prevTimetable = timeTableBasedOnDays[prevDate];
      if (!isEqual(prevTimetable, currentTimetable)) {
        if (currentRange) {
          dateRanges.push(currentRange);
        }
        currentRange = [currentDate, currentDate];
      } else {
        if (currentRange) {
          currentRange[1] = currentDate;
        }
      }
    }
  }

  if (currentRange) {
    dateRanges.push(currentRange);
  }

  return dateRanges;
}

export function shuffleArray(array: Room[]): Room[] {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (array[i] && array[j]) {
      // eslint-disable-next-line
      // @ts-ignore
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
}

export function convertToISODate(inputDate: string): string | null {
  const trimmedDate = inputDate.trim().replace(/,$/, "");
  const dateParts = trimmedDate.split("/");

  if (dateParts.length !== 3) {
    return null;
  }

  const year = parseInt(dateParts[2] ?? "");
  const month = parseInt(dateParts[1] ?? "");
  const day = parseInt(dateParts[0] ?? "");

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  const isoDateString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return isoDateString;
}

export function sanitizeTimeTable(timeTable: TimeTable): TimeTable {
  // Make a deep copy of the timeTable object
  const sanitizedTimeTable: TimeTable = timeTable;

  // Iterate over the years
  for (const year in sanitizedTimeTable) {
    if (sanitizedTimeTable.hasOwnProperty(year)) {
      const departments = sanitizedTimeTable[year];

      // Iterate over the departments
      for (const department in departments) {
        if (departments.hasOwnProperty(department)) {
          const dates = departments[department];

          // Iterate over the dates
          for (const date in dates) {
            if (dates.hasOwnProperty(date)) {
              // Check for blank "" values and delete if found
              if (dates[date] === "") {
                delete dates[date];
              }
            }
          }

          // Optionally, clean up any empty department objects
          if (Object.keys(departments[department] ?? {}).length === 0) {
            delete departments[department];
          }
        }
      }

      // Optionally, clean up any empty year objects
      if (Object.keys(sanitizedTimeTable[year] ?? {}).length === 0) {
        delete sanitizedTimeTable[year];
      }
    }
  }

  return sanitizedTimeTable;
}
