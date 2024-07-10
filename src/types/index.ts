export type Student = {
  id: number;
  name: string;
  registerNumber: string;
  gender: string;
  department: string;
  year: string;
  degree: string;
  gateStudent: boolean;
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

export type TimeTable = Record<string, Record<string, Record<string, string>>>;

export type ExamWithPracticals = Record<
  string,
  Record<
    string,
    { morningBatches: [string, string][]; afternoonBatches: [string, string][] }
  >
>;
