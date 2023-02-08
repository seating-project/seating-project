"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { useState } from "react";

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

export default function ExamForm({ templates }) {
  const template_options = [];
  templates.map((template) => {
    if (
      { value: template["id"], label: template["template_name"] } in
      template_options
    ) {
      return;
    } else {
      template_options.push({
        value: template["id"],
        label: template["template_name"],
      });
    }
    console.log(template[("template_name", "id")], template);
    console.log(template_options);
  });
  const [selectedDept, setSelectedDept] = useState([]);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    const form = document.getElementById("examform");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const selectedDeptValues = selectedDept.map((dept) => dept.value);
    data["depts"] = { depts: selectedDeptValues };
    console.log(data);
    const res = await axios.post("http://127.0.0.1:8080/createexam/", data);
    // router.push("/exams");
  };

  const handleDeptChange = (selectedOption) => {
    setSelectedDept(selectedOption);
  };

  return (
    <div className="p-8 justify-center items-center">
      <h1 className="font-semibold pt-5 text-4xl">New Exam</h1>
      <form
        action="http://127.0.0.1:8080/createexam"
        method="post"
        id="examform"
        onSubmit={handleSubmit}
      >
        <div className="mt-8 ">
          {/* <label className="block my-5" htmlFor="id">
            <span>Exam ID</span>
            <input
              type="number"
              id="id"
              name="id"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
            />
          </label> */}

          <label className="block my-5" htmlFor="name">
            <span>Exam Name</span>
            <input
              type="text"
              id="  name"
              name="name"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
              required
            />
          </label>

          <label htmlFor="fromdate" className="block my-5 w-max">
            <span>From Date</span>
            <input
              type="date"
              id="fromdate"
              name="fromdate"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
              required
            />
          </label>

          <label htmlFor="todate" className="block my-5 w-max">
            <span>To Date</span>
            <input
              type="date"
              id="todate"
              name="todate"
              className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
              required
            />
          </label>

          <label htmlFor="depts" className="block my-5 w-max">
            <span>Departments (select multiple)</span>
            <Select
              id="depts"
              name="depts"
              options={dept_options}
              value={selectedDept}
              onChange={handleDeptChange}
              isMulti
              className="w-max"
            />
          </label>

          <label htmlFor="template">
            <span>Exam Template</span>
            <Select
              id="template"
              name="template"
              options={template_options}
              className="w-max"
            />
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
  );
}

// {
//   "name": "Internal Assessment 2",
//   "fromdate": "2023-02-08",
//   "exam_todate": "2023-02-15",
//   "exam_depts": [
//       "mech",
//       "cse"
//   ],
//   "exam_template": "2"
// }
