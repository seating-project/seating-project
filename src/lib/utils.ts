import { clsx, type ClassValue } from "clsx";
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
