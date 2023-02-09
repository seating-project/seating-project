"use client";
import TableInput from "../../components/TimeTable";
import { examData } from "../../src/store";

export default function Page() {
  // const data = {
  //   departments: ["mech", "cse", "it"],
  //   dates: ["7.2.23", "8.2.23", "9.2.23"],
  // };
  console.log(examData.getState().name);
  
  // return (
  //   <div>
  //     <h1>Time Table</h1>
  //   </div>
  // )
  //return <TableInput data={data} />;
}
