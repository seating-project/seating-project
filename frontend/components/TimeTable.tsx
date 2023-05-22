import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@material-ui/core";
import drf from "../pages/api/axiosConfig";
import { useRouter } from "next/navigation";

type InputValues = { [year: number]: { [department: string]: { [date: string]: string } } };
type DeptAndDate = { departments : string[], dates : Date[]}

const   MyTable = ({deptanddate, post_data, years} ) => {
  const dates: Date[] = deptanddate.dates;
  const departments: string[] = deptanddate.departments;

  const initialInputValues: InputValues = {};
  // years.forEach((year: number) => {
  //   initialInputValues[year] = {};
  //   departments.forEach((department) => {
  //     initialInputValues[year][department] = {};
  //     dates.forEach((date) => {
  //       initialInputValues[year][department][date.toISOString().slice(0,10)] = "";
  //     });
  //   });
  // });
  // console.log("INTIAL INPUT VALUES",initialInputValues)
  const [inputValues, setInputValues] = useState<InputValues>(initialInputValues);
  const router = useRouter();

  console.log("inputValues", inputValues);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, department: string, date: Date, year: number) => {
    console.log("YEAR", year);
    console.log("DEPARTMENT", department);
    console.log("DATE", date.toISOString().slice(0,10));
    console.log("VALUE", event.target.value);
    setInputValues({
      ...inputValues,
      [year]: {
        ...inputValues?.[year],
        [department]: {
          ...inputValues?.[year]?.[department],
          [date.toISOString().slice(0,10)]: event.target.value,
        },
      },
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log("POST DATA", post_data);
    console.log(inputValues);
    // Example output:
    // {
    //   IT: { "2022-04-01T00:00:00.000Z": "8", "2022-04-02T00:00:00.000Z": "6", "2022-04-03T00:00:00.000Z": "7" },
    //   HR: { "2022-04-01T00:00:00.000Z": "7", "2022-04-02T00:00:00.000Z": "6", "2022-04-03T00:00:00.000Z": "8" },
    //   Marketing: { "2022-04-01T00:00:00.000Z": "6", "2022-04-02T00:00:00.000Z": "5", "2022-04-03T00:00:00.000Z": "7" }
    // }


    post_data["time_table"] = inputValues;
    console.log("POST DATA", post_data);
    drf.post("/createexams/", post_data)
    // redirect to home page
    // router.push("/"); 

    
  };

  return (
    <>
      {years.map((year: number) => (
        <div key={year} className="w-2/3 bg-white rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold  mb-4">Year {year} Timetable</h2>
          <form onSubmit={handleSubmit}>
            <TableContainer component={Paper} className="flex flex-col items-center justify-center" >
              <Table 
                border={1}
                align="center"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="font-bold text-lg"
                    >Departments / Dates</TableCell>
                    {dates.map((date) => (
                      <TableCell align="center" className="text-lg" key={date.toISOString()}>{date.toISOString().slice(0, 10)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department}>
                      <TableCell align="center"className="text-lg" >{department.toUpperCase()}</TableCell>
                      {dates.map((datey) => (
                        <TableCell key={`${department}-${datey.toISOString().slice(0,10)}`}>
                          <TextField
                            value={inputValues?.[year]?.[department]?.[datey.toISOString().slice(0,10)] ?? ""}
                            onChange={(event) => handleInputChange(event, department, datey, year)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
            </TableContainer>
          </form>
        </div>
      ))}
      <button type="submit" onClick={handleSubmit} className="mt-2  items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      <div className="h-8">

      </div>
    </>
  );
};

export default MyTable;

// {
//   "exam_name": "Form Test",
//   "from_date": "Fri, 24 Mar 2023 18:30:00 GMT",
//   "to_date": "Wed, 29 Mar 2023 18:30:00 GMT",
//   "is_phd": false,
//   "phd_room": "",
//   "phd_students": [],
//   "is_me": false,
//   "me_room": "",
//   "is_years_together": false,
//   "is_departments_together": true,
//   "is_send_whatsapp_message": false,
//   "time_to_send_whatsapp_message": "",
//   "sets_for_which_subjects": [],
//   "no_of_sets": 0,
//   "second_column_options": "Seats Number",
//   "exam_template": "Assessment",
//   "years": [
//       1
//   ],
//   "departments": {
//       "Main Building": [
//           "cse",
//           "aids",
//           "it",
//           "csbs",
//           "eee",
//           "ece"
//       ],
//       "New Building": []
//   },
//   "time_table": {
//       "cse": {
//           "25/3/2023, 12:00:00 am": "gugu",
//           "26/3/2023, 12:00:00 am": "gi",
//           "27/3/2023, 12:00:00 am": "gi",
//           "28/3/2023, 12:00:00 am": "gk",
//           "29/3/2023, 12:00:00 am": "gk",
//           "30/3/2023, 12:00:00 am": "gk"
//       },
//       "aids": {
//           "25/3/2023, 12:00:00 am": "gk",
//           "26/3/2023, 12:00:00 am": "glg",
//           "27/3/2023, 12:00:00 am": "lg",
//           "28/3/2023, 12:00:00 am": "lhk",
//           "29/3/2023, 12:00:00 am": "g",
//           "30/3/2023, 12:00:00 am": "lhl"
//       },
//       "it": {
//           "25/3/2023, 12:00:00 am": "gl",
//           "26/3/2023, 12:00:00 am": "hl",
//           "27/3/2023, 12:00:00 am": "gl",
//           "28/3/2023, 12:00:00 am": "lg",
//           "29/3/2023, 12:00:00 am": "lg",
//           "30/3/2023, 12:00:00 am": "lg"
//       },
//       "csbs": {
//           "25/3/2023, 12:00:00 am": "lg",
//           "26/3/2023, 12:00:00 am": "lgl",
//           "27/3/2023, 12:00:00 am": "gl",
//           "28/3/2023, 12:00:00 am": "gl",
//           "29/3/2023, 12:00:00 am": "gl",
//           "30/3/2023, 12:00:00 am": "gl"
//       },
//       "eee": {
//           "25/3/2023, 12:00:00 am": "gl",
//           "26/3/2023, 12:00:00 am": "gl",
//           "27/3/2023, 12:00:00 am": "gl",
//           "28/3/2023, 12:00:00 am": "hkg",
//           "29/3/2023, 12:00:00 am": "kh",
//           "30/3/2023, 12:00:00 am": "kg"
//       },
//       "ece": {
//           "25/3/2023, 12:00:00 am": "kh",
//           "26/3/2023, 12:00:00 am": "kg",
//           "27/3/2023, 12:00:00 am": "kg",
//           "28/3/2023, 12:00:00 am": "jg",
//           "29/3/2023, 12:00:00 am": "kgk",
//           "30/3/2023, 12:00:00 am": "gk"
//       }
//   }
// }