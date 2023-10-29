import type { Student as PrismaStudent } from "@prisma/client";

export type Student = {
  id: number;
  name: string;
  registerNumber: string;
  gender: string;
  department: string;
  year: string;
  degree: string;
  phoneNumber: string | undefined;
};

export type Template = {
  Rooms: {
    id: number;
    number: string;
    floor: number;
    strength: number;
    buildingId: number;
    blockId: number;
  }[];
  name: string;
  id: number;
  numberOfRows: number;
  numberOfColumns: number;
  roomStrength: number;
  isSingleSeater: boolean;
  isBoysGirlsSeparate: boolean;
  startTime: Date;
  endTime: Date;
  isAlternateDepartmentSeated: boolean;
  isRandomizedDepartments: boolean;
  logoId: number;
};

export type Option = {
  value: string;
  label: string;
};

// export type TimeTableDatePart = {
//   [key: string]: string;
// };
// export type TimeTableDatePart = Record<string, string>;

// export type TimeTableDepartmentPart = Record<string, TimeTableDatePart>;

// export type TimeTable = Record<string, TimeTableDepartmentPart>;

export type TimeTable = Record<string, Record<string, Record<string, string>>>;

// export type Students = {
//   [year: number]:
//     {

//         [gender: string]: {
//           left: PrismaStudent[];
//           right: PrismaStudent[];
//         };
//       }
//     | {

//         left: PrismaStudent[];
//         right: PrismaStudent[];
//       }
//     | {

//         [gender: string]: PrismaStudent[];
//       }
//     | PrismaStudent[];
// };

// export interface BoysGirlsStudents {
//   [year: string]: {
//     boys: PrismaStudent[];
//     girls: PrismaStudent[];
//   };
// }

export type BoysGirlsStudents = Record<
  string,
  {
    boys: PrismaStudent[];
    girls: PrismaStudent[]; 
  }
>;

export interface BoysGirlsSeparateStudents {
  [year: string]: {
    boys: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
    // | PrismaStudent[];
    girls: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
    // | PrismaStudent[];
    // [gender: string]: PrismaStudent[];
  };
}

export interface LeftRightStudents {
  [year: string]: {
    left: PrismaStudent[];
    right: PrismaStudent[];
  };
}

// export interface LeftRightStudents {

// }

export interface YearStudents {
  [year: string]: PrismaStudent[];
}

export type Students =
  // | BoysGirlsStudents
  | BoysGirlsSeparateStudents
  | LeftRightStudents
  // | Record<string, PrismaStudent[]>
  | BoysGirlsStudents

  // | Record<string,
  | YearStudents;

// export type Students = {
//   examName: string;
// } & (
//   | {
//       type: "BGSEPFULL";
//       [year: number]: {
//         boys: {
//           left: PrismaStudent[];
//           right: PrismaStudent[];
//         };
//         girls: {
//           left: PrismaStudent[];
//           right: PrismaStudent[];
//         };
//       };
//     }
//   | {
//       type: "NOSEPHALF";
//       [year: number]: {
//         left: PrismaStudent[];
//         right: PrismaStudent[];
//       };
//     }
//   | {
//       type: "BGSEPHALF";
//       [year: number]: {
//         boys: PrismaStudent[];
//         girls: PrismaStudent[];
//       };
//     }
//   | {
//       type: "NOSEPFULL";
//       [year: number]: PrismaStudent[];
//     }
//   | object
// );

export type StudentAllotments = {
  [room: string]: (string | number | undefined)[][][];
};

export type SingleStudent = {
  regNo: string;
  department: string;
  year: number;
  gender: string;
  name: string;
}[];
