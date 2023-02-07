"use client";
import TableInput from "../../components/TimeTable";

export default function Page() {
  const data = {
    departments: ["mech", "cse", "it"],
    dates: ["7.2.23", "8.2.23", "9.2.23"],
  };

  return <TableInput data={data} />;
}
