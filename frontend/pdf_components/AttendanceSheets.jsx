import React from "react";
import Attendance from "../pdf_components/Attendance";

const AttendanceSheets = ({ ranges }) => {
  let dept_and_their_ranges = {};
  Object.keys(ranges).forEach((k) => {
    console.log("ROOMIE", k);
    Object.keys(ranges[k]).forEach((key1) => {
      let dept = key1;
      let roomie = k;
      if (dept_and_their_ranges[dept]) {
        let obj = {};
        obj[roomie] = ranges[roomie][key1];
        dept_and_their_ranges[dept].push(obj);
      } else {
        let obj1 = {};
        obj1[roomie] = ranges[roomie][key1];
        dept_and_their_ranges[dept] = [obj1];
      }
    });
  });
  return <div>
    {Object.keys(dept_and_their_ranges).map((dept) => {
        <Attendance ranges={dept_and_their_ranges[dept]} dept={dept} />
    })
    }
  </div>;
};

export default AttendanceSheets;
