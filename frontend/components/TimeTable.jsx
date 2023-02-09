import React, { useState } from "react";

// function Convert() {
//   var table = document.getElementById("timetable");
//   var header = [];
//   var rows = [];

//   rows.push(table.rows[0]);
//   // for (var i = 0; i < table.rows[0].cells.length; i++) {
//   //   header.push(table.rows[0].cells[i].innerHTML);
//   // }

//   // for (var i = 1; i < table.rows.length; i++) {
//   //   var row = {};
//   //   for (var j = 0; j < table.rows[i].cells.length; j++) {
//   //     row[header[j]] = table.rows[i].cells[j].innerHTML;
//   //   }
//   //   rows.push(row);

//   alert(JSON.stringify(rows));
// }

function createJSON(dates, depts, inputValues) {
  const result = {};
  depts.forEach((dept, index) => {
    result[dept] = {};
    dates.forEach((date, i) => {
      result[dept][date] = inputValues[i][index];
    });
  });
  return result;
}

const TableInput = ({ data }) => {
  const [inputValues, setInputValues] = useState({});

  const handleChange = async (e, department, date) => {
    // console.log(inputValues);
    // inputValues[department][date] = e.target.value;
    // setInputValues(...inputValues);
    setInputValues({
      ...inputValues,
      [department]: {
        ...inputValues[department],
        [date]: e.target.value,
      },
    });
    // console.log(e.target.value, department, date);
  };

  const doSomething = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    const form = document.getElementById("timetableform");
    console.log(form);
    const formData = new FormData(form);
    const inputValues = Object.values(formData.entries());
    console.log("values", inputValues);
    // const res = await axios.post("http://localhost:8080/createexam/", data);
    // router.push("/exams");
  };

  console.log(inputValues);

  return (
    <div className="p-8 justify-center items-center">
      <h1 className="font-semibold py-5 text-4xl">Exam Time Table</h1>
      <form id="timetableform">
        <table className="table-auto m-5 border">
          <thead className="border">
            <tr>
              <th className="border"></th>
              {data.departments.map((department) => (
                <th key={department}>{department}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.dates.map((date) => (
              <tr key={date} className="border">
                <th>{date}</th>
                {data.departments.map((department) => (
                  <td key={department} className="border">
                    <input
                      type="text"
                      value={inputValues[department]?.[date] || ""}
                      onChange={(e) => handleChange(e, department, date)}
                      className="border-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          id="formsubmit"
          onSubmit={(event) => doSomething(event)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TableInput;

//  onSubmit={test(inputValues)}
