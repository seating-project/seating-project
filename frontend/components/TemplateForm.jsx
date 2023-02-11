"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { useState } from "react";
import drf from "../pages/api/axiosConfig";

function MyForm() {
  const rooms = [
    { value: "T1", label: "T1", group: "Third Floor" },
    { value: "T2", label: "T2", group: "Third Floor" },
    { value: "T3", label: "T3", group: "Third Floor" },
    { value: "T4", label: "T4", group: "Third Floor" },
    { value: "T5", label: "T5", group: "Third Floor" },
    { value: "T6", label: "T6", group: "Third Floor" },
    { value: "T7", label: "T7", group: "Third Floor" },
    { value: "T8", label: "T8", group: "Third Floor" },
    { value: "T9", label: "T9", group: "Third Floor" },
    { value: "T10", label: "T10", group: "Third Floor" },
    { value: "T11", label: "T11", group: "Third Floor" },
    { value: "T12", label: "T12", group: "Third Floor" },
    { value: "T13", label: "T13", group: "Third Floor" },
    { value: "T14", label: "T14", group: "Third Floor" },
    { value: "T15", label: "T15", group: "Third Floor" },
    { value: "T16", label: "T16", group: "Third Floor" },
    { value: "T17", label: "T17", group: "Third Floor" },
    { value: "T18", label: "T18", group: "Third Floor" },
    { value: "T19", label: "T19", group: "Third Floor" },
    { value: "T20", label: "T20", group: "Third Floor" },
  ];

  const [selectedRooms, setSelectedRooms] = useState([]);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting form data");
    const form = document.getElementById("templateform");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const selectedRoomsValues = selectedRooms.map((room) => room.value);
    data["rooms"] = { rooms: selectedRoomsValues };
    console.log(data);
    console.log(selectedRoomsValues);
    const res = await drf.post("/createexamtemplate/", data);
    router.push("/templates");
  };

  const handleRoomChange = (selectedOption) => {
    setSelectedRooms(selectedOption);
  };

  // const handleSubmit = () => {
  //   const selectedRoomsValues = selectedRooms.map((room) => room.value);
  //   console.log({ rooms: { rooms: selectedRoomsValues } });
  // };

  // need

  return (
    <>
      <div className="p-8 justify-center items-center">
        <h1 className="font-semibold pt-5 text-4xl">Template Wizard</h1>
        <form
          action="http://127.0.0.1:8080/createexamtemplate/"
          method="post"
          id="templateform"
          onSubmit={handleSubmit}
        >
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-1 gap-6">
              <label htmlFor="id" className="block">
                <span>Template ID</span>
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
                  required
                />
              </label>

              <label className="block" htmlFor="template_name">
                <span>Template Name</span>
                <input
                  type="text"
                  id="template_name"
                  name="template_name"
                  className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                  required
                />
              </label>
              <label htmlFor="num_rows" className="block">
                <span>Rows</span>
                <input
                  type="number"
                  id="num_rows"
                  name="num_rows"
                  className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                  required
                />
              </label>

              <label htmlFor="num_columns" className="block">
                <span>Columns</span>
                <input
                  type="number"
                  id="num_columns"
                  name="num_columns"
                  className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                  required
                />
              </label>

              <label htmlFor="room_strength" className="block">
                <span>Room Strength</span>
                <input
                  type="number"
                  id="room_strength"
                  name="room_strength"
                  className="mt-1
                block
                rounded-md
                bg-gray-200
                border-transparent
                focus:border-gray-300 focus:bg-gray-200 focus:ring-0"
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <label htmlFor="rooms">
                <span>Rooms (select multiple)</span> <br />
                <Select
                  id="rooms"
                  name="rooms"
                  options={rooms}
                  value={selectedRooms}
                  onChange={handleRoomChange}
                  isMulti
                  className="w-max"
                ></Select>
              </label>

              <label htmlFor="single_seater" className="block">
                <span>Single Seater</span>
                <input
                  type="checkbox"
                  value={true}
                  id="single_seater"
                  name="single_seater"
                  className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-200 focus:ring-0"
                  defaultChecked
                />
              </label>

              <label htmlFor="boys_girls_separation" className="block">
                <span>Boys/Girls seperation</span>
                <input
                  type="checkbox"
                  id="boys_girls_separation"
                  name="boys_girls_separation"
                  value={true}
                  className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-200 focus:ring-0"
                  defaultChecked
                />
              </label>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-max"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default MyForm;

// {
//   "id": "2",
//   "template_name": "test template",
//   "num_rows": 5,
//   "num_columns": 6,
//   "room_strength": 60,
// "rooms": {
//     "rooms": [
//         "F1",
//         "F2",
//         "F3",
//         "F4",
//         "F5",
//         "F6"
//     ]
// },
//   "single_seater": false,
//   "boys_girls_separation": false
// }

// {
//   "id": "1",
//   "template_name": "Preetam",
//   "num_rows": "5",
//   "num_columns": "5",
//   "room_strength": "50",
//   "rooms": {
//       "rooms": [
//           "T1",
//           "T2",
//           "T3",
//           "T4",
//           "T5"
//       ]
//   },
//   "single_seater": "true",
//   "boys_girls_separation": "true"
// }
