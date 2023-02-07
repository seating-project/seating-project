"use client";
import axios from "axios";
import React from "react";
import Select from "react-select";

const dept_options = [
  { value: "MECH", label: "MECH" },
  { value: "CSE", label: "CSE" },
  { value: "MCT", label: "MCT" },
  { value: "ECE", label: "ECE" },
  { value: "EEE", label: "EEE" },
  { value: "CIVIL", label: "CIVIL" },
  { value: "IT", label: "IT" },
  { value: "AI&DS", label: "AI&DS" },
  { value: "CSBS", label: "CSBS" },
  { value: "BME", label: "BME" },
];

export default function ExamForm() {
  return (
    <div className="p-8 justify-center items-center">
      <h1 className="font-semibold pt-5 text-4xl">New Exam</h1>
      <form action="/createexam" method="post">
        <div className="mt-8 ">
          <label className="block my-5" htmlFor="templatename">
            <span>Exam Name</span>
            <input
              type="text"
              id="templatename"
              name="templatename"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
              required
            />
          </label>

          <label htmlFor="fromDate" className="block my-5 w-max">
            <span>From Date</span>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
              required
            />
          </label>

          <label htmlFor="toDate" className="block my-5 w-max">
            <span>To Date</span>
            <input
              type="date"
              id="toDate"
              name="toDate"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
              required
            />
          </label>

          <label htmlFor="dept" className="block my-5 w-max">
            <span>Departments</span>
            <Select id="dept" name="dept" options={dept_options} isMulti />
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-max"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    // Need multiselect component
    // Input for dates of exam and holidays in between
    // Input for departments
  );
}
