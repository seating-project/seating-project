"use client";

import { MouseEvent } from "react";
import "../styles/globals.css";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import Select, {StylesConfig} from "react-select";
import MyTable from "./TimeTable";

const getDates = (startDate: string, endDate: string) => {
  let dates = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate());
  let end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  while (currentDate < end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

type DepartmentsType = {
  [key: string]: string[];
};

type TemplateType = {
  [key: string]: string;
};

type RoomsType = {
  [key: string]: string;
};

type YearsType = {
  [key: string]: string;
};

type PHDStudentsType ={
  [key: string]: string;
}

type Templates = {
  template_name: string;
  number_of_rows: number;
  number_of_columns: number;
  room_strength: number;
  is_single_seater: boolean;
  is_boys_girls_separation: boolean;
  start_time: string;
  end_time: string;
  is_alternate_dept_seated: boolean;
  logo: number;
  rooms: string[];
  buildings: string[];
}

const getDepartments = (departments: DepartmentsType) => {
  const dept = Object.values(departments);
  return dept.flat();
};

const sub_opt = [
  { value: "TOC", label: "TOC" },
  { value: "ESS", label: "ESS" },
  { value: "DBMS", label: "DBMS" },
  { value: "APT", label: "APT" },
  { value: "OS", label: "OS" },
];

const sc_opt = [
  { label: "Seat Number", value: "Seat Number" },
  { label: "Present/Absent", value: "Present/Absent" },
  { label: "Set Code", value: "Set Code" },
];

const subjects_opt = ["TOC", "ESS", "DBMS", "APT", "OS"];

type UserFormProps = {
  templates: Templates[];
  template_opt: TemplateType[];
  years_opt: YearsType;
  department_opt: DepartmentsType[];
  rooms_opt: RoomsType;
  phdstudents_opt: PHDStudentsType[];
};

type BuildingDepartments = {
  [building: string]: string[];
};

type Departments = BuildingDepartments | [];

const UserForm = ({
  templates,
  template_opt,
  years_opt,
  department_opt,
  rooms_opt,
  phdstudents_opt,
}: UserFormProps) => {


  // console.log("templates", templates);
  console.log("template_opt", template_opt);
  // console.log("phdstudents_opt", phdstudents_opt);
  console.log("departments_opt", department_opt);
  // console.log("ROOOMS", rooms_opt);
  const DropdownStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      width: "full",
      height: 50,
      borderRadius: 10,
      border: "1px solid #000000",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #8080FF",
      },
    }),
    option: (provided) => ({
      ...provided,
      color: "#000000",
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      "&:hover": {
        backgroundColor: "#8080FF",
        color: "#FFFFFF",
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: 300,
      borderRadius: 10,
      border: "1px solid #000000",
      boxShadow: "none",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      borderRadius: 10,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      borderRadius: 10,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#8080FF",
      color: "#FFFFFF",
      borderRadius: 10,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#FFFFFF",
      borderRadius: 10,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#FFFFFF",
      borderRadius: 10,
      "&:hover": {
        backgroundColor: "#8080FF",
        color: "#FFFFFF",
      },
    }),
  }


  const [next, setNext] = useState(false);
  const [deptanddate, setDeptanddate] = useState({});
  const [postdata, setPostdata] = useState({});
  // const [strictlyDivide, setStrictlyDivide] = useState<boolean>(false);
  const [diffLeftRightBG, setDiffLeftRightBG] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    examName: "",
    years: [] as any[],
    departments: {
      "Main Building": [],
      "New Building": [],
    },
    fromdate: new Date(),
    todate: new Date(),
    phdchecked: false,
    phdRoom: null,
    phdStudents: [] as any[],
    mechecked: false,
    meRoom: null,
    yearsTogether: false,
    departmentsTogether: false,
    sendWAMessage: false,
    timetosend: null,
    sets: [] as any[],
    numberofsets: null,
    secondColumnOptions: "",
    template: "",
    departmentsLeft: {
      "boys": [],
      "girls": [],
    },
    departmentsRight: {
      "boys": [],
      "girls": [],
    },
    minStudents: 60,
    randomizeEveryNRooms: 0,
    roomsOrder: [] as any[],
    girlsRooms: [] as any[],
    strictlyDivide: false,
    commonRoomStrength: false
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

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(formData);
    customRoomOptions()
  };


  const customRoomOptions = () => {
    const currTemplate = templates.filter((template)=>{return template.template_name === formData.template})[0]
    let roomsOptions: RoomsType[] = [];
    if (currTemplate == undefined) {
      return roomsOptions
    }
    currTemplate.rooms.forEach((room)=>{
      roomsOptions.push({label:room, value:room})
    })
    return roomsOptions
  }

  

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();
    
    
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
      strictly_divide_buildings: formData.strictlyDivide,
      is_common_room_strength: formData.commonRoomStrength
    });

    // console.log("POST DATA", postdata);

    // console.log("FORM DATA", formData);

    setDeptanddate({
      departments: getDepartments(formData.departments),
      dates: getDates(
        formData.fromdate?.toISOString().slice(0, 10) as string,
        formData.todate?.toISOString().slice(0, 10) as string
      ),
    });

    console.log("DEPT AND DATE", deptanddate);
    console.log("POST DATA", postdata)
    console.log("YEARS", formData.years)

    setNext(true);
  };

  return (
    <div className="flex justify-center gap-4 flex-col items-center">

      <form className="bg-white border shadow-xl p-8 rounded-xl w-2/3">
        <div className="flex flex-col gap-4">
          <div className="mb-6">
            <label
              htmlFor="examName"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Exam Name
            </label>
            <input
              type="name"
              id="examName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the name of the exam"
              required
              onChange={(e) =>
                setFormData({ ...formData, examName: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="fromdate"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              From Date
            </label>
            <input
              type="date"
              id="fromdate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) =>
                setFormData({ ...formData, fromdate: new Date(e.target.value) })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="todate"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              To Date
            </label>
            <input
              type="date"
              id="todate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) =>
                setFormData({ ...formData, todate: new Date(e.target.value) })
              }
            />
          </div>

          <div className="mb-6 flex gap-8 items-center">
            <label
              htmlFor="template"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Template
            </label>

            <Dropdown
              label={
                formData.template === "" ? "Select Template" : formData.template
              }
              dismissOnClick={true}
              defaultValue={formData.template}
              className="mt-4 w-1/5"
              
            >
              {template_opt.map((option: TemplateType) => (
                <Dropdown.Item
                  key={option.value}
                  value={option.value}
                  onClick={() =>
                    setFormData({ ...formData, template: option.value })
                  }
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="flex items-center gap-8">
            <label
              htmlFor="years"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Years
            </label>

            <Select
              defaultValue={formData.years}
              onChange={(e) =>
                setFormData({ ...formData, years: e.map((x) => x.value) })
              }
              className=""
              placeholder="Select Years"
              isMulti
              options={years_opt as any}
              styles={DropdownStyles}
            />
          </div>
          {/* Divider */}
          <div className="border-t border-gray-500 my-8 " />
              
              
          <div>
            <div className="flex items-center mb-4 justify-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value={formData.strictlyDivide as any}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                // onChange={(e) => setStrictlyDivide(e.target.checked)}
                onChange={(e) =>
                  setFormData({ ...formData, strictlyDivide: e.target.checked })
                }
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
              >
                Strictly Divide into Buildings?
              </label>
            </div>
          </div>
          {!formData.strictlyDivide ? (
            <div>
              <label
                htmlFor="departments"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Departments
              </label>

              <Select
                defaultValue={formData.departments}
                onChange={(e) =>
                  setFormData({ ...formData, departments: e.map((x: any) => x.value) as any })
                }
                className=""
                placeholder="Select Departments"
                isMulti
                options={department_opt}
                styles={DropdownStyles}
              />
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="departmentsLeft"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Departments in Main Building
                </label>
                <Select
                  defaultValue={formData.departments["Main Building"]}
                  onChange={(e) =>
                    setFormData((prevState: any) => ({
                      ...prevState,
                      departments: {
                        ...prevState.departments,
                        "Main Building": e.map((x: any) => x.value),
                      },
                    }))
                  }
                  className=""
                  placeholder="Select Departments"
                  isMulti
                  options={department_opt}
                  styles={DropdownStyles}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="departmentsRight"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Departments in New Building
                </label>
                <Select
                  defaultValue={formData.departments["New Building"]}
                  onChange={(e) =>
                    setFormData((prevState: any) => ({
                      ...prevState,
                      departments: {
                        ...prevState.departments,
                        "New Building": e.map((x: any) => x.value),
                      },
                    }))
                  }
                  className=""
                  placeholder="Select Departments"
                  isMulti
                  options={department_opt}
                  styles={DropdownStyles}
                />
              </div>
            </div>
          )}
          {/* Divider */}
          <div className="border-t border-gray-500 my-8 mt-8" />
          <div className="flex items-center mb-4">
            <input
              id="phdchecked"
              type="checkbox"
              value={formData.phdchecked as any}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                setFormData({ ...formData, phdchecked: e.target.checked })
              }
            />
            <label
              htmlFor="phdchecked"
              className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
            >
              Include PhD Students?
            </label>
          </div>
          {formData.phdchecked && (
            <div>
              <label
                htmlFor="phdStudents"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                PhD Students
              </label>

              <Select
                defaultValue={formData.phdStudents}
                onChange={(e) =>
                  setFormData({ ...formData, phdStudents: e.map((x: any) => x.value) })
                }
                className=""
                placeholder="Select the PhD Students"
                isMulti
                options={phdstudents_opt}
                styles={DropdownStyles}
              />
            </div>
          )}
          {formData.phdchecked && (
            <div>
              <label
                htmlFor="phdRoom"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                PhD Room
              </label>

              <Dropdown
                label={
                  formData.phdRoom === null
                    ? "Select PhD Room"
                    : formData.phdRoom
                }
                dismissOnClick={true}
                defaultValue={formData.phdRoom as any}
                className="mt-4"
              >
                {customRoomOptions().map((option: RoomsType) => (
                  <Dropdown.Item
                    key={option.value}
                    value={option.value}
                    onClick={() =>
                      setFormData({ ...formData, phdRoom: option.value as any })
                    }
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-500 my-8 mt-8" />

          <div className="flex items-center mb-4">
            <input
              id="mechecked"
              type="checkbox"
              value={formData.mechecked as any}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                setFormData({ ...formData, mechecked: e.target.checked })
              }
            />
            <label
              htmlFor="mechecked"
              className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
            >
              Include ME Students?
            </label>
          </div>
          {formData.mechecked && (
            <div>
              <label
                htmlFor="meRoom"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                ME Room
              </label>

              <Dropdown
                label={
                  formData.meRoom === null ? "Select ME Room" : formData.meRoom
                }
                dismissOnClick={true}
                defaultValue={formData.meRoom as any}
                className="mt-4"
              >
                {customRoomOptions().map((option: RoomsType) => (
                  <Dropdown.Item
                    key={option.value}
                    value={option.value}
                    onClick={() =>
                      setFormData({ ...formData, meRoom: option.value as any })
                    }
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-500 my-8 mt-8" />
          <div>
            <div className="flex items-center mb-4">
              <input
                id="isYearsTogether"
                type="checkbox"
                value={formData.yearsTogether as any}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) =>
                  setFormData({ ...formData, yearsTogether: e.target.checked })
                }
              />
              <label
                htmlFor="isYearsTogether"
                className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
              >
                Are different year students seated together?
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <input
                id="isDeptTogether"
                type="checkbox"
                value={formData.departmentsTogether as any}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    departmentsTogether: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="isDeptTogether"
                className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
              >
                Are different departments students seated together?
              </label>
            </div>
          </div>
          {formData.departmentsTogether && (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="bgLeftRight"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Different Left, Right Departments for boys and girls?
                  </label>
                  <input
                    id="bgLeftRight"
                    type="checkbox"
                    value={diffLeftRightBG as any}

                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) =>
                      setDiffLeftRightBG(e.target.checked)
                    }
                  />
              </div>
            </div>)}

          {
            diffLeftRightBG && (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="bgLeftBoys"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                  >
                    Departments in Left Row for Boys
                  </label>


                  <Select
                    defaultValue={formData.departmentsLeft["boys"]}
                    onChange={(e) =>
                      setFormData((prevState: any)=>({
                        ...prevState,
                        departmentsLeft: {
                          ...prevState.departmentsLeft,
                          "boys": e.map((x: any) => x.value),
                        }
                      })

                      )}
                    className=""
                    placeholder="Select the Departments"
                    isMulti
                    options={department_opt}
                    styles={DropdownStyles}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="bgRightBoys"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                  >
                    Departments in Right Row for Boys

                  </label>
                  <Select
                    defaultValue={formData.departmentsRight["boys"]}
                    onChange={(e) =>
                      setFormData((prevState: any)=>({
                        ...prevState,
                        departmentsRight: {
                          ...prevState.departmentsRight,
                          "boys": e.map((x: any) => x.value),
                        }
                      })

                      )}
                    className=""
                    placeholder="Select the Departments"
                    isMulti
                    options={department_opt}
                    styles={DropdownStyles}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="bgLeftGirls"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                  >
                    Departments in Left Row for Girls
                  </label>
                  <Select
                    defaultValue={formData.departmentsLeft["girls"]}
                    onChange={(e) =>
                      setFormData((prevState: any)=>({
                        ...prevState,
                        departmentsLeft: {
                          ...prevState.departmentsLeft,
                          "girls": e.map((x: any) => x.value),
                        }
                      })

                      )}
                    className=""
                    placeholder="Select the Departments"
                    isMulti
                    options={department_opt}

                    styles={DropdownStyles}
                  />
                  </div>
                <div className="mb-4">
                  <label

                    htmlFor="bgRightGirls"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                  >
                    Departments in Right Row for Girls
                  </label>
                  <Select

                    defaultValue={formData.departmentsRight["girls"]}
                    onChange={(e) =>
                      setFormData((prevState: any)=>({
                        ...prevState,
                        departmentsRight: {
                          ...prevState.departmentsRight,
                          "girls": e.map((x: any) => x.value),
                        }
                      })

                      )}
                    className=""
                    placeholder="Select the Departments"
                    isMulti
                    options={department_opt}
                    styles={DropdownStyles}
                  />
                  </div>
              </div>
            )


          }

          {formData.departmentsTogether && !diffLeftRightBG && (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="deptLeft"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Department in Left Row
                </label>

                <Select
                  defaultValue={formData.departmentsLeft}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      departmentsLeft: e.map((x: any) => x.value) as any,
                    })
                  }
                  className=""
                  placeholder="Select the Departments"
                  isMulti
                  options={department_opt}
                  styles={DropdownStyles}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deptRight"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Department in Right Row
                </label>
                <Select
                  defaultValue={formData.departmentsRight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      departmentsRight: e.map((x: any) => x.value) as any,
                    })
                  }
                  className=""
                  placeholder="Select the Departments"
                  isMulti
                  options={department_opt}
                  styles={DropdownStyles}
                />
              </div>
            </div>
          )}
          {/* Divider */}
          <div className="border-t border-gray-500 my-8 mt-8" />
          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <input
                id="isSendWAMessage"
                type="checkbox"
                value={formData.sendWAMessage as any}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sendWAMessage: e.target.checked,
                  })
                }
                disabled={true}
              />
              <label
                htmlFor="isSendWAMessage"
                className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300"
              >
                Send WhatsApp Message? <span className="text-[#8080FF]">(Coming Soon)</span>
              </label>
            </div>
          </div>
          {formData.sendWAMessage && (
            <div>
              <label
                htmlFor="timeToSendWAMessage"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Time to send WhatsApp Message?
              </label>
              <input
                id="timeToSendWAMessage"
                type="time"
                value={formData.timetosend as any}
                className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timetosend: e.target.value as any,
                  })
                }
              />
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-500 my-8 mt-8" />

          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="sets"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Subjects for which sets  <span className="text-[#8080FF]">(Coming Soon)</span>
              </label>
              <Select
                defaultValue={formData.sets}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sets: e.map((x) => x.value),
                  })
                }
                className=""
                placeholder="Select the Subjects"
                isMulti
                // options={sub_opt.map((x) => x.value)}
                options={sub_opt as any}
                styles={DropdownStyles}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="sets"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Number of Sets <span className="text-[#8080FF]">(Coming Soon)</span>
              </label>
              <Dropdown
                label={
                  formData.numberofsets
                    ? formData.numberofsets
                    : "Select the number of sets"
                }
                dismissOnClick={true}
                defaultValue={formData.numberofsets as any}
                className="mt-4"
              >
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          numberofsets: i + 1 as any,
                        })
                      }
                    >
                      {i + 1}
                    </Dropdown.Item>
                  ))}
              </Dropdown>
            </div>
          </div>
                    
          {/* Divider */}
          <div className="border-t border-gray-500 my-8 mt-8" />
          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="secondColumnOptions"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Second Column Options
              </label>
              <Dropdown
                label={
                  formData.secondColumnOptions
                    ? formData.secondColumnOptions
                    : "Select the Second Column Options"
                }
                dismissOnClick={true}
                defaultValue={formData.secondColumnOptions}
                className="mt-4"
              >
                {sc_opt.map((x) => (
                  <Dropdown.Item
                    key={x.value}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        secondColumnOptions: x.value,
                      })
                    }
                  >
                    {x.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="commonRoomStrength"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Use common room strength? ({formData.template != "" ? templates.filter((template)=>{return template.template_name === formData.template})[0].room_strength : " "})
              </label>

              <input
                id="commonRoomStrength"
                type="checkbox"
                value={formData.commonRoomStrength as any}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    commonRoomStrength: e.target.checked,
                  })
                }
              />
            </div>
            
          </div>

          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="minimumNumberOfStudents"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Minimum Number of Students
              </label>
              <input
                id="minimumNumberOfStudents"
                type="number"
                value={formData.minStudents}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minStudents: e.target.value as any,
                  })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="randomizeEveryNRooms"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Randomize Every N Rooms
              </label>
              <input
                id="minimumNumberOfStudents"
                type="number"
                value={formData.randomizeEveryNRooms}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    randomizeEveryNRooms: e.target.value as any,
                  })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="roomOrder"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Room Order
              </label>
              <Select
                defaultValue={formData.roomsOrder as any}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roomsOrder: e.map((x) => x.value) as any,
                  })
                }
                className=""
                placeholder="Select the Room Order"
                isMulti
                // options={sub_opt.map((x) => x.value)}
                options={customRoomOptions()}
                styles={DropdownStyles}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4 gap-x-8">
              <label
                htmlFor="girlsRooms"
                className=" text-xl font-medium text-gray-900 dark:text-gray-300 mr-4"
              >
                Girl's Rooms
              </label>
              <Select
                defaultValue={formData.girlsRooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    girlsRooms: e.map((x) => x.value),
                  })
                }
                className=""
                placeholder="Select the Girl's Rooms"
                isMulti
                // options={sub_opt.map((x) => x.value)}
                options={customRoomOptions()}
                styles={DropdownStyles}
              />

            </div>
            
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg"
          onClick={handleClick}
        >
          Next
        </button>
        <div className="h-6" />
      </form>
      {next && (
        <MyTable
        deptanddate={deptanddate}
        post_data={postdata}
        years={formData.years}
      />)}
      
    </div>
  );
};

export default UserForm;
