import React, { useState } from "react";

const TableInput = ({ data }) => {
  const [inputValues, setInputValues] = useState({});

  const handleChange = (e, department, date) => {
    setInputValues({
      ...inputValues,
      [department]: {
        ...inputValues[department],
        [date]: e.target.value,
      },
    });
  };

  return (
    <div className="p-8 justify-center items-center">
      <h1 className="font-semibold py-5 text-4xl">Exam Time Table</h1>
      <table className="table-auto m-5 border">
        <thead className="border">
          <tr>
            <th></th>
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
    </div>
  );
};

export default TableInput;
