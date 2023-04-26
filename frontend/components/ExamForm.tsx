"use client";

import { MouseEvent } from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import Chip from "@mui/material/Chip";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MyTable from "./TimeTable";
import '../styles/globals.css';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const getDates = (startDate: string, endDate: string) => {
  let dates = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 1);
  let end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

type DepartmentsType = {
  [key: string]: string[]
}

const getDepartments = (departments: DepartmentsType) => {
  const dept = Object.values(departments);
  return dept.flat();
}


//Data
const initialValues = {
  examName: "",
  fromDate: "",
  toDate: "",
  template: "",
  years: []
  // departments: []
};

const options = [
  { label: "Computer Programmer", value: "Computer_programmer" },
  { label: "Web Developer", value: "web_developer" },
  { label: "User Experience Designer", value: "user_experience_designer" },
  { label: "Systems Analyst", value: "systems_analyst" },
  { label: "Quality Assurance Tester", value: "quality_assurance_tester" }
];

const sc_opt = [
  { label: "Seat Number", value: "Seat Number" },
  { label: "P/A", value: "P/A" },
  { label: "Set Code", value: "Set Code" }
];

const temp_opt = [
  { label: "Model", value: "Model" },
  { label: "Assessment", value: "Assessment" }
];

const phd_opt = [
  { label: "Student1", value: "Student1" },
  { label: "Student2", value: "Student2" },
  { label: "Student3", value: "Student3" }
];

const year_opt = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 }
];

const dept_options = [
  { label: "CSE", value: "cse" },
  { label: "AIDS", value: "aids" },
  { label: "IT", value: "it" },
  { label: "CSBS", value: "csbs" },
  { label: "EEE", value: "eee" },
  { label: "ECE", value: "ece" },
  { label: "MECH", value: "mech" },
  { label: "MCT", value: "mct" },
  { label: "CIVIL", value: "civil" },
  { label: "BME", value: "bme" }
];

const buildings = ["Main Building", "New Building"];

const room_opt = [
  { label: "F1", value: "F1" },
  { label: "F2", value: "F2" },
  { label: "F3", value: "F3" },
  { label: "F4", value: "F4" }
];

const sub_opt = [
  { label: "TOC", value: "TOC" },
  { label: "ESS", value: "ESS" },
  { label: "DBMS", value: "DBMS" },
  { label: "APT", value: "APT" },
  { label: "OS", value: "OS" }
];
//password validation
// const lowercaseRegEx = /(?=.*[a-z])/
// const uppercaseRegEx = /(?=.*[A-Z])/
// const numericRegEx = /(?=.*[0-9])/
// const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
  examName: Yup.string().required("Required")
  // lastName: Yup.string().required("Required"),
  // email: Yup.string().email("Invalid email").required("Required"),
  // password: Yup.string()
  //   .matches(
  //     lowercaseRegEx,
  //     "Must contain one lowercase alphabetical character!"
  //   )
  //   .matches(
  //     uppercaseRegEx,
  //     "Must contain one uppercase alphabetical character!"
  //   )
  //   .matches(numericRegEx, "Must contain one numeric character!")
  //   .matches(lengthRegEx, "Must contain 6 characters!")
  //   .required("Required!"),
});

const UserForm = ({template_opt, years_opt, department_opt, rooms_opt, phdstudents_opt}) => {
  const classes = useStyle();

  const [examName, setExamName] = useState("");
  const [years, setYears] = useState<number[]>([]);
  const [departments, setDepartments] = useState({
    "Main Building": [],
    "New Building": []
  });
  const [fromdate, setFromDate] = useState<Date | null>(null);
  const [todate, setToDate] = useState<Date | null>(null);
  const [phdchecked, setphdChecked] = useState(false);
  const [phdRoom, setphdRoom] = useState(null);
  const [phdStudents, setphdStudents] = useState([]);
  const [mechecked, setmeChecked] = useState(false);
  const [meRoom, setmeRoom] = useState(null);
  const [yearsTogether, setyearsTogether] = useState(false);
  const [departmentsTogether, setdepartmentsTogether] = useState(false);
  const [sendWAMessage, setsendWAMessage] = useState(false);
  const [timetosend, setTimetosend] = useState(null);
  const [sets, setSets] = useState([]);
  const [numberofsets, setNumberofsets] = useState(null);
  const [secondColumnOptions, setSecondColumnOptions] = useState("");
  const [template, setTemplate] = useState("");

  const [next, setNext] = useState(false);
  const [deptanddate, setDeptanddate] = useState({});
  const [postdata, setPostdata] = useState({});
  const [sides, setSides] = useState({})

  const phdChange = (event: MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setphdChecked(target.checked);
    console.log("CHECKED", phdchecked);
  };
  const meChange = (event: MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setmeChecked(target.checked);
    console.log("CHECKED ME", mechecked);
  };

  const answer = {}
  const handleClick = () => {

    console.log("ROSHAN");
    console.log(fromdate);
    console.log(todate);
    console.log(phdchecked);
    console.log(secondColumnOptions);

    // const post_data = {
    //   exam_name: examName,
    //   from_date: fromdate?.toString(),
    //   to_date: todate?.toString(),
    //   is_phd: phdchecked,
    //   phd_room: phdRoom,
    //   phd_students: phdStudents,
    //   is_me: mechecked,
    //   me_room: meRoom,
    //   is_years_together: yearsTogether,
    //   is_departments_together: departmentsTogether,
    //   is_send_whatsapp_message: sendWAMessage,
    //   time_to_send_whatsapp_message: timetosend,
    //   sets_for_which_subjects: sets,
    //   no_of_sets: numberofsets,
    //   second_column_options: secondColumnOptions,
    //   exam_template: template,
    //   years: years,
    //   departments: departments
    // }

    setPostdata({
      exam_name: examName,
      from_date: fromdate?.toISOString().slice(0, 10),
      to_date: todate?.toISOString().slice(0, 10),
      is_phd: phdchecked,
      phd_room: phdRoom,
      phd_students: phdStudents,
      is_me: mechecked,
      me_room: meRoom,
      is_years_together: yearsTogether,
      is_departments_together: departmentsTogether,
      is_send_whatsapp_message: sendWAMessage,
      time_to_send_whatsapp_message: timetosend,
      sets_for_which_subjects: sets,
      no_of_sets: numberofsets,
      second_column_options: secondColumnOptions,
      exam_template: template,
      years: years,
      departments: departments
    })

    console.log("POST DATA", postdata);
    
    setDeptanddate({
      departments: getDepartments(departments),
      dates: getDates(fromdate?.toISOString().slice(0, 10) as string, todate?.toISOString().slice(0, 10) as string)
    })

    

    console.log("DEPT AND DATE", deptanddate);

    setNext(true);

    
    

  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="EXAM FORM"></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleClick}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Exam Name"
                          variant="outlined"
                          fullWidth
                          name="Exam Name"
                          value={examName}
                          component={TextField}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExamName(e.target.value)}
                        />
                      </Grid>
                      <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="From date"
                              value={fromdate}
                              onChange={(newVal) => setFromDate(newVal)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                      <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="To date"
                              value={todate}
                              onChange={(newVal) => setToDate(newVal)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                      {/* <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          name="lastName"
                          value={values.lastName}
                          component={TextField}
                        />
                      </Grid> */}

                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Template
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Template"
                            onChange={(event) =>
                              setTemplate(event.target.value as string)
                            }
                            onBlur={handleBlur}
                            value={template}
                            name="occupation"
                          >
                            <MenuItem>None</MenuItem>
                            {template_opt.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Years
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            multiple
                            label="Years"
                            onChange={(event) => setYears(event.target.value as number[])}
                            onBlur={handleBlur}
                            value={years}
                            name="years"
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(years: unknown) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gridGap: 0.5
                                }}
                              >
                                  {(years as number[]).map((value: number) => (
                                    <Chip key={value} label={value} />
                                  ))}
                              </Box>
                            )}
                          >
                            {/* <MenuItem>None</MenuItem> */}
                            {years_opt.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {buildings.map((building) => {
                        return (
                          <Grid item xs={12} sm={6} md={12}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="demo-simple-select-outlined-label">
                                Departments in {building}
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                multiple
                                label="Departments"
                                onChange={(event) =>
                                  setDepartments((prevState) => ({
                                    ...prevState,
                                    [building]: event.target.value
                                  }))
                                }
                                onBlur={handleBlur}
                                value={departments[building]}
                                name="years"
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(years) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5
                                    }}
                                  >
                                    {departments[building].map((value) => {
                                      console.log(departments);
                                      return <Chip key={value} label={value} />;
                                    })}
                                  </Box>
                                )}
                              >
                                {department_opt.map((item) => (
                                  <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        );
                      })}
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Are Phd Students writing exam?"
                            checked={phdchecked}
                            onChange={phdChange}
                          />
                        </FormGroup>
                      </Grid>
                      {phdchecked ? (
                        <Grid item xs={12} sm={6} md={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Ph.D Students
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              multiple
                              label="Ph.D Students"
                              onChange={(event) =>
                                setphdStudents(event.target.value)
                              }
                              onBlur={handleBlur}
                              value={phdStudents}
                              name="phdstudents"
                              input={
                                <OutlinedInput
                                  id="select-multiple-chip"
                                  label="Chip"
                                />
                              }
                              renderValue={(phdStudents) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5
                                  }}
                                >
                                  {phdStudents.map((value) => {
                                    console.log(phdStudents);
                                    return <Chip key={value} label={value} />;
                                  })}
                                </Box>
                              )}
                            >
                              {phdstudents_opt.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      ) : null}
                      {phdchecked ? (
                        <Grid item xs={12} sm={6} md={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Ph.D Room
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="Ph.D Room"
                              onChange={(event) =>
                                setphdRoom(event.target.value)
                              }
                              onBlur={handleBlur}
                              value={phdRoom}
                              name="phdroom"
                            >
                              <MenuItem>None</MenuItem>
                              {rooms_opt.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      ) : null}
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Are M.E. Students writing exam?"
                            checked={mechecked}
                            onChange={meChange}
                          />
                        </FormGroup>
                      </Grid>
                      {mechecked ? (
                        <Grid item xs={12} sm={6} md={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              M.E Room
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="M.E Room"
                              onChange={(event) =>
                                setmeRoom(event.target.value)
                              }
                              onBlur={handleBlur}
                              value={meRoom}
                              name="M.E Room"
                            >
                              <MenuItem>None</MenuItem>
                              {rooms_opt.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      ) : null}
                      {/* <Grid>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="Are years seated together?" checked={yearsTogether} onChange={(event)=>setyearsTogether(event.target.checked)}} />
                        </FormGroup>
                      </Grid> */}
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Are years seated together?"
                            checked={yearsTogether}
                            onChange={(event) =>
                              setyearsTogether(event.target.checked)
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Are departments seated together?"
                            checked={departmentsTogether}
                            onChange={(event) =>
                              setdepartmentsTogether(event.target.checked)
                            }
                          />
                        </FormGroup>
                      </Grid>
                      {/* <Grid item xs={12} sm={6} md={12}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="demo-simple-select-outlined-label">
                                Departments in left row
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                multiple
                                label="Departments"
                                onChange={(event) =>
                                  setSides((prevState) => ({
                                    ...prevState,
                                    [left]: event.target.value
                                  }))
                                }
                                onBlur={handleBlur}
                                value={sides[left]}
                                name="years"
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(years) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5
                                    }}
                                  >
                                    {departments["left"].map((value) => {
                                      console.log(departments);
                                      return <Chip key={value} label={value} />;
                                    })}
                                  </Box>
                                )}
                              >
                                {department_opt.map((item) => (
                                  <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid> */}
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Send Whatsapp messages?"
                            checked={sendWAMessage}
                            onChange={(event) =>
                              setsendWAMessage(event.target.checked)
                            }
                          />
                        </FormGroup>
                      </Grid>

                      {sendWAMessage ? (
                        <Grid>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["TimePicker"]}>
                              <TimePicker
                                label="Set the time"
                                value={timetosend}
                                onChange={(event, time) => setTimetosend(time)}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Grid>
                      ) : null}
                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Subject which have sets?
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            multiple
                            label="Ph.D Students"
                            onChange={(event) => setSets(event.target.value)}
                            onBlur={handleBlur}
                            value={sets}
                            name="sets"
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(sets) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5
                                }}
                              >
                                {sets.map((value) => {
                                  console.log(sets);
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            )}
                          >
                            <MenuItem key={"none"} value="None">
                              {" "}
                              None{" "}
                            </MenuItem>
                            {sub_opt.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {sets[0] !== "None" ? (
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Number of Sets"
                            variant="outlined"
                            fullWidth
                            name="noOfSets"
                            value={numberofsets}
                            component={TextField}
                            onChange={(event) =>
                              setNumberofsets(event.target.value)
                            }
                            type="number"
                          />
                        </Grid>
                      ) : null}
                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Second Column Options
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Second Column Options"
                            onChange={(event) =>
                              setSecondColumnOptions(event.target.value)
                            }
                            onBlur={handleBlur}
                            value={secondColumnOptions}
                            name="Second Column Options"
                          >
                            {sc_opt.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      // disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.button}
                      onClick={handleClick}
                    >
                      REGISTER
                    </Button>
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </Card>
        {next ? <MyTable deptanddate={deptanddate} post_data={postdata}/> : null }
        

      </Grid>
    </Grid>
  );
};

export default UserForm;

// import React from "react";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormGroup,
//   FormControlLabel,
// } from "@mui/material";

// const ExamForm = () => {
//   const [isPhd, setIsPhd] = React.useState(false);

//   const handlePhdChange = (event) => {
//     setIsPhd(event.target.checked);
//   };

//   return (
//     <FormControl>
//       <TextField label="Exam Name" required />
//       <br />
//       <TextField label="From Date" type="date" required />
//       <br />
//       <TextField label="To Date" type="date" required />
//       <br />
//       <FormControl required>
//         <InputLabel>Exam Template</InputLabel>
//         <Select>
//           <MenuItem value="template1">Template 1</MenuItem>
//           <MenuItem value="template2">Template 2</MenuItem>
//           <MenuItem value="template3">Template 3</MenuItem>
//         </Select>
//       </FormControl>
//       <br />
//       <TextField label="Departments" required />
//       <br />
//       <TextField label="Time Table" multiline rows={4} required />
//       <br />
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isPhd}
//               onChange={handlePhdChange}
//               name="isPhd"
//             />
//           }
//           label="Is PhD?"
//         />
//       </FormGroup>
//     </FormControl>
//   );
// };

// export default ExamForm;
