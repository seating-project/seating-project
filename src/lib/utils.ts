import type { TimeTable, TimeTableDatePart, TimeTableDepartmentPart } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
    Object.keys(timetable[year] as TimeTableDepartmentPart).map((department: string) => {
      Object.keys(timetable?.[year]?.[department] as TimeTableDatePart).map((date) => {
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
