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
  Checkbox,
  Typography,
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
import "../styles/globals.css";

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
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
};

type DepartmentsType = {
  [key: string]: string[];
};

const getDepartments = (departments: DepartmentsType) => {
  const dept = Object.values(departments);
  return dept.flat();
};

//Data
const initialValues = {
  examName: "",
  fromDate: "",
  toDate: "",
  template: "",
  years: [],
  // departments: []
};

const sc_opt = [
  { label: "Seat Number", value: "Seat Number" },
  { label: "Present/Absent", value: "Present/Absent" },
  { label: "Set Code", value: "Set Code" },
];

const buildings = ["Main Building", "New Building"];

const sub_opt = [
  { label: "TOC", value: "TOC" },
  { label: "ESS", value: "ESS" },
  { label: "DBMS", value: "DBMS" },
  { label: "APT", value: "APT" },
  { label: "OS", value: "OS" },
];

//validation schema
let validationSchema = Yup.object().shape({
  examName: Yup.string().required("Required"),
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

const UserForm = ({
  templates,
  template_opt,
  years_opt,
  department_opt,
  rooms_opt,
  phdstudents_opt,
}) => {
  const classes = useStyle();

  const [examName, setExamName] = useState("");
  const [years, setYears] = useState<number[]>([]);
  const [departments, setDepartments] = useState({
    "Main Building": [],
    "New Building": [],
  });
  // const [fromdate, setFromDate] = useState<Date | null>(null);
  // const [todate, setToDate] = useState<Date | null>(null);
  // const [phdchecked, setphdChecked] = useState(false);
  // const [phdRoom, setphdRoom] = useState(null);
  // const [phdStudents, setphdStudents] = useState([]);
  // const [mechecked, setmeChecked] = useState(false);
  // const [meRoom, setmeRoom] = useState(null);
  // const [yearsTogether, setyearsTogether] = useState(false);
  // const [departmentsTogether, setdepartmentsTogether] = useState(false);
  // const [sendWAMessage, setsendWAMessage] = useState(false);
  // const [timetosend, setTimetosend] = useState(null);
  // const [sets, setSets] = useState([]);
  // const [numberofsets, setNumberofsets] = useState(null);
  // const [secondColumnOptions, setSecondColumnOptions] = useState("");
  // const [template, setTemplate] = useState("");
  // const [departmentsLeft, setDepartmentsLeft] = useState<string[]>([]);
  // const [departmentsRight, setDepartmentsRight] = useState<string[]>([]);
  // const [minStudents, setMinStudents] = useState(60);

  const [next, setNext] = useState(false);
  const [deptanddate, setDeptanddate] = useState({});
  const [postdata, setPostdata] = useState({});
  // const [sides, setSides] = useState({});

  const [formData, setFormData] = useState({
    examName: "",
    years: [],
    departments: {
      "Main Building": [],
      "New Building": [],
    },
    fromdate: null,
    todate: null,
    phdchecked: false,
    phdRoom: null,
    phdStudents: [],
    mechecked: false,
    meRoom: null,
    yearsTogether: false,
    departmentsTogether: false,
    sendWAMessage: false,
    timetosend: null,
    sets: [],
    numberofsets: null,
    secondColumnOptions: "",
    template: "",
    departmentsLeft: [],
    departmentsRight: [],
    minStudents: 60,
    randomizeEveryNRooms: 0,
    roomsOrder: [],
    girlsRooms: [],
  });

  const phdChange = (event: MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    // setphdChecked(target.checked);
    setFormData({ ...formData, phdchecked: target.checked });
  };
  const meChange = (event: MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    // setmeChecked(target.checked);
    setFormData({ ...formData, mechecked: target.checked });
  };

  // const template = templates.find((t) => t.template_name === formData.template);
  // console.log(template);

  const answer = {};
  const handleClick = () => {
    // console.log("ROSHAN");
    // console.log(fromdate);
    // console.log(todate);
    // console.log(phdchecked);
    // console.log(secondColumnOptions);

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
      exam_name: formData.examName,
      from_date: formData.fromdate?.toISOString().slice(0, 10),
      to_date: formData.todate?.toISOString().slice(0, 10),
      is_phd: formData.phdchecked,
      phd_room: formData.phdRoom,
      phd_students: formData.phdStudents,
      is_me: formData.mechecked,
      me_room: formData.meRoom,
      is_years_together: formData.yearsTogether,
      is_departments_together: formData.departmentsTogether,
      is_send_whatsapp_message: formData.sendWAMessage,
      time_to_send_whatsapp_message: formData.timetosend,
      sets_for_which_subjects: formData.sets,
      no_of_sets: formData.numberofsets,
      second_column_options: formData.secondColumnOptions,
      exam_template: formData.template,
      years: formData.years,
      departments: formData.departments,
      departments_left: formData.departmentsLeft,
      departments_right: formData.departmentsRight,
      minimum_students_in_room: formData.minStudents,
      randomize_every_n_rooms: formData.randomizeEveryNRooms,
      rooms_order: formData.roomsOrder,
      girls_rooms: formData.girlsRooms,
    });

    console.log("POST DATA", postdata);

    // console.log("FORM DATA", formData);

    setDeptanddate({
      departments: getDepartments(formData.departments),
      dates: getDates(
        formData.fromdate?.toISOString().slice(0, 10) as string,
        formData.todate?.toISOString().slice(0, 10) as string
      ),
    });

    console.log("DEPT AND DATE", deptanddate);

    setNext(true);
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader
            style={{ textAlign: "center", fontSize: "1.5rem" }}
            title="Exam Form"
          ></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleClick}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={4} justifyContent="center">
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        style={{ minWidth: "100%" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Enter the exam name
                        </Typography>
                        <Field
                          label="Exam Name"
                          variant="outlined"
                          fullWidth
                          name="Exam Name"
                          value={formData.examName}
                          component={TextField}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            // setExamName(e.target.value)
                            setFormData((prevState) => ({
                              ...prevState,
                              examName: e.target.value,
                            }))
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Typography variant="h6" gutterBottom>
                          Select the date range
                        </Typography>
                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Grid>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  label="From Date"
                                  value={formData.fromdate}
                                  onChange={(newVal) =>
                                    //  setFromDate(newVal)
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      fromdate: newVal,
                                    }))
                                  }
                                  slotProps={{
                                    textField: {
                                      helperText: "MM/DD/YYYY",
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Grid>
                          <Grid>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  label="To Date"
                                  value={formData.todate}
                                  onChange={(newVal) =>
                                    // setToDate(newVal)
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      todate: newVal,
                                    }))
                                  }
                                  slotProps={{
                                    textField: {
                                      helperText: "MM/DD/YYYY",
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Grid>
                        </Grid>
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
                              // setTemplate(event.target.value as string)
                              setFormData((prevState) => ({
                                ...prevState,
                                template: event.target.value,
                              }))
                            }
                            onBlur={handleBlur}
                            value={formData.template}
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
                            onChange={(event) =>
                              // setYears(event.target.value as number[])
                              setFormData((prevState) => ({
                                ...prevState,
                                years: event.target.value,
                              }))
                            }
                            onBlur={handleBlur}
                            value={formData.years}
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
                                  gridGap: 0.5,
                                }}
                              >
                                {(formData.years as number[]).map(
                                  (value: number) => (
                                    <Chip key={value} label={value} />
                                  )
                                )}
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
                                  // setDepartments((prevState) => ({
                                  //   ...prevState,
                                  //   [building]: event.target.value,
                                  // }))
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    departments: {
                                      ...prevState.departments,
                                      [building]: event.target.value,
                                    },
                                  }))
                                }
                                onBlur={handleBlur}
                                value={formData.departments[building]}
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
                                      gap: 0.5,
                                    }}
                                  >
                                    {formData.departments[building].map(
                                      (value) => {
                                        // console.log(departments);
                                        return (
                                          <Chip key={value} label={value} />
                                        );
                                      }
                                    )}
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
                            checked={
                              // phdchecked
                              formData.phdchecked
                            }
                            onChange={phdChange}
                          />
                        </FormGroup>
                      </Grid>
                      {formData.phdchecked ? (
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
                                // setphdStudents(event.target.value)
                                setFormData((prevState) => ({
                                  ...prevState,
                                  phdStudents: event.target.value,
                                }))
                              }
                              onBlur={handleBlur}
                              value={formData.phdStudents}
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
                                    gap: 0.5,
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
                      {formData.phdchecked ? (
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
                                // setphdRoom(event.target.value)
                                setFormData((prevState) => ({
                                  ...prevState,
                                  phdRoom: event.target.value,
                                }))
                              }
                              onBlur={handleBlur}
                              value={formData.phdRoom}
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
                            // checked={mechecked}
                            checked={formData.mechecked}
                            onChange={meChange}
                          />
                        </FormGroup>
                      </Grid>
                      {formData.mechecked ? (
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
                                // setmeRoom(event.target.value)
                                setFormData((prevState) => ({
                                  ...prevState,
                                  meRoom: event.target.value,
                                }))
                              }
                              onBlur={handleBlur}
                              value={formData.meRoom}
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
                            checked={formData.yearsTogether}
                            onChange={(event) =>
                              // setyearsTogether(event.target.checked)
                              setFormData((prevState) => ({
                                ...prevState,
                                yearsTogether: event.target.checked,
                              }))
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Are departments seated together?"
                            checked={formData.departmentsTogether}
                            onChange={(event) =>
                              // setdepartmentsTogether(event.target.checked)
                              setFormData((prevState) => ({
                                ...prevState,
                                departmentsTogether: event.target.checked,
                              }))
                            }
                          />
                        </FormGroup>
                      </Grid>

                      {formData.departmentsTogether ? (
                        <Grid item xs={12} sm={6} md={12}>
                          <Grid item xs={12} sm={6} md={12} spacing={4}>
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
                                  // setDepartmentsLeft(event.target.value as string[])
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    departmentsLeft: event.target.value,
                                  }))
                                }
                                onBlur={handleBlur}
                                value={formData.departmentsLeft}
                                name="departmentsLeft"
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(year) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {formData.departmentsLeft.map((value) => {
                                      // console.log(departments);
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
                          <Grid item xs={12} sm={6} md={12}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="demo-simple-select-outlined-label">
                                Departments in right row
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                multiple
                                label="Departments"
                                onChange={(event) =>
                                  // setDepartmentsRight(event.target.value as string[])
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    departmentsRight: event.target.value,
                                  }))
                                }
                                onBlur={handleBlur}
                                value={formData.departmentsRight}
                                name="departmentsRight"
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(year) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {formData.departmentsRight.map((value) => {
                                      // console.log(departments);
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
                        </Grid>
                      ) : null}
                      <Grid>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Send Whatsapp messages?"
                            checked={formData.sendWAMessage}
                            onChange={(event) =>
                              // setsendWAMessage(event.target.checked)
                              setFormData((prevState) => ({
                                ...prevState,
                                sendWAMessage: event.target.checked,
                              }))
                            }
                          />
                        </FormGroup>
                      </Grid>

                      {formData.sendWAMessage ? (
                        <Grid>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["TimePicker"]}>
                              <TimePicker
                                label="Set the time"
                                value={formData.timetosend}
                                onChange={(event, time) =>
                                  // setTimetosend(time)
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    timetosend: time,
                                  }))
                                }
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
                            onChange={(event) =>
                              // setSets(event.target.value)
                              setFormData((prevState) => ({
                                ...prevState,
                                sets: event.target.value,
                              }))
                            }
                            onBlur={handleBlur}
                            value={formData.sets}
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
                                  gap: 0.5,
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
                      {formData.sets[0] !== "None" ? (
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Number of Sets"
                            variant="outlined"
                            fullWidth
                            name="noOfSets"
                            value={formData.numberofsets}
                            component={TextField}
                            onChange={(event) =>
                              // setNumberofsets(event.target.value)
                              setFormData((prevState) => ({
                                ...prevState,
                                numberofsets: event.target.value,
                              }))
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
                              // setSecondColumnOptions(event.target.value)
                              setFormData((prevState) => ({
                                ...prevState,
                                secondColumnOptions: event.target.value,
                              }))
                            }
                            onBlur={handleBlur}
                            value={formData.secondColumnOptions}
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
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Minimum Students in a room"
                          variant="outlined"
                          fullWidth
                          name="Minimum Students in a room"
                          value={formData.minStudents}
                          component={TextField}
                          onChange={(event) =>
                            // setMinStudents(event.target.value)
                            setFormData((prevState) => ({
                              ...prevState,
                              minStudents: event.target.value,
                            }))
                          }
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Randomize every n rooms"
                          variant="outlined"
                          fullWidth
                          name="Randomize every n rooms"
                          value={formData.randomizeEveryNRooms}
                          component={TextField}
                          onChange={(event) =>
                            // setMinStudents(event.target.value)
                            setFormData((prevState) => ({
                              ...prevState,
                              minStudents: event.target.value,
                            }))
                          }
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Room Order
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            multiple
                            label="Departments"
                            onChange={(event) =>
                              // setDepartmentsRight(event.target.value as string[])
                              setFormData((prevState) => ({
                                ...prevState,
                                roomsOrder: event.target.value,
                              }))
                            }
                            onBlur={handleBlur}
                            value={formData.roomsOrder}
                            name="departmentsRight"
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(year) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {formData.roomsOrder.map((value) => {
                                  // console.log(departments);
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            )}
                          >
                            {templates.filter((template) => { return template.template_name === formData.template }).map((template) => {
                              console.log(template)
                              return template.rooms.map((room) => {
                                return <MenuItem key={room} value={room}>{room}</MenuItem>
                              })
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Girls Rooms
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            multiple
                            label="Departments"
                            onChange={(event) =>
                              // setDepartmentsRight(event.target.value as string[])
                              setFormData((prevState) => ({
                                ...prevState,
                                girlsRooms: event.target.value,
                              }))
                            }
                            onBlur={handleBlur}
                            value={formData.girlsRooms}
                            name="departmentsRight"
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(year) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {formData.girlsRooms.map((value) => {
                                  // console.log(departments);
                                  return <Chip key={value} label={value} />;
                                })}
                              </Box>
                            )}
                          >
                            {templates.filter((template) => { return template.template_name === formData.template }).map((template) => {
                              console.log(template)
                              return template.rooms.map((room) => {
                                return <MenuItem key={room} value={room}>{room}</MenuItem>
                              })
                            })}
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
        {next ? (
          <MyTable
            deptanddate={deptanddate}
            post_data={postdata}
            years={formData.years}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default UserForm;
