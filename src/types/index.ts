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

export type TimeTableDatePart = {
  [key: string]: string;
};

export type TimeTableDepartmentPart = {
  [key: string]: TimeTableDatePart;
};

export type TimeTable = {
  [key: string]: TimeTableDepartmentPart;
};

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

export type BoysGirlsSeparateStudents = {
  one: {
    boys: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
    girls: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
  };
  two: {
    boys: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
    girls: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
  };
  three: {
    boys: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
    girls: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
  };
  four: {
    boys: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
    girls: {
      left: PrismaStudent[];
      right: PrismaStudent[];
    };
  };
};

export type LeftRightStudents = {
  [year: string]: {
    left: PrismaStudent[];
    right: PrismaStudent[];
  };
};

export type BoysGirlsStudents = {
  [year: string]: {
    boys: PrismaStudent[];
    girls: PrismaStudent[];
  };
};

export type YearStudents = {
  [year: string]: PrismaStudent[];
};

export type Students =
  | BoysGirlsSeparateStudents
  | LeftRightStudents
  | BoysGirlsStudents
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
