import { create } from "zustand";

// export const useRoomData = create((set) => ({
//     id: 0,
//     rooms : {},
// }));

export const useTemplateData = create<{
  id: number;
  rows: number;
  columns: number;
  room_strength: number;
  count_in_bench: number;
  rooms: any[];
}>((set) => ({
  id: 0,
  rows: 0,
  columns: 0,
  room_strength: 0,
  count_in_bench: 0,
  rooms: [],
}));

export const useDeptID = create<{
  dept_id_object: any;
}>((set) => ({
  dept_id_object: {
    '104': "CSE",
    '114': "MECH",
    '115': "MCT",
    '205': "IT",
    '103': "CIVIL",
    '105': "EEE",
    '106': "ECE",
    '243': "AIDS",
    '121': "BME",
    '244': "CSBS",
  },
}));
