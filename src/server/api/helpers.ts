import type { Room, Student } from "@prisma/client";

import { db } from "@/server/db";

export async function getAllotments({
  examId,
  templateId,
}: {
  examId: number;
  templateId: number;
}) {
  // ? ==================== ALLOTMENTS FUNCTION ====================

  // ! IMPORTANT NOTE
  // ! This function is very complicated and has a lot of edge cases
  // ! So please be careful while modifying it

  // Getting the exam data
  const exam = await db.exam.findUnique({
    where: { id: examId },
    include: {
      Departments: true,
      Template: true,
      Years: true,
      DepartmentsLeftBoys: true,
      DepartmentsLeftGirls: true,
      DepartmentsRightBoys: true,
      DepartmentsRightGirls: true,
      DepartmentsLeftSingleYear: true,
      DepartmentsRightSingleYear: true,
      RoomsOrder: true,
    },
  });

  // Getting the template data
  const template = await db.template.findUnique({
    where: { id: templateId },
    include: {
      Buildings: true,
      Rooms: true,
    },
  });

  // If the exam or template is not found, throw an error
  if (!exam || !template) {
    throw new Error("Not found");
  }

  // Create the allotments object
  const allotments: Record<string, [Student | null, Student | null][]> = {};

  // * Creating the allotments based on the conditions of the template and exam

  if (template.isSingleSeater) {
    if (template.isAlternateDepartmentSeated) {
      const cs: Student[] = []; // Circuit students

      // Getting all the Circuit students
      await Promise.all(
        exam.Departments.map(async (department) => {
          const students = await db.student.findMany({
            where: {
              yearId: {
                in: exam.Years.map((year) => year.id),
              },
              departmentId: department.id,
              Department: {
                type: "Circuit",
              },
            },
            orderBy: {
              registerNumber: "asc",
            },
          });
          cs.push(...students);
        }),
      );

      // Sorting the circuit students based on the department order
      const circuitStudents = cs.sort((a, b) => {
        const aIndex = exam.Departments.findIndex(
          (department) => department.id === a.departmentId,
        );
        const bIndex = exam.Departments.findIndex(
          (department) => department.id === b.departmentId,
        );
        return aIndex - bIndex;
      });

      const ncs: Student[] = []; // Non-Circuit students

      // Getting all the Non-Circuit students
      await Promise.all(
        exam.Departments.map(async (department) => {
          const students = await db.student.findMany({
            where: {
              yearId: {
                in: exam.Years.map((year) => year.id),
              },
              departmentId: department.id,
              Department: {
                type: "NonCircuit",
              },
            },
            orderBy: {
              registerNumber: "asc",
            },
          });
          ncs.push(...students);
        }),
      );

      // Sorting the non-circuit students based on the department order
      const nonCircuitStudents = ncs.sort((a, b) => {
        const aIndex = exam.Departments.findIndex(
          (department) => department.id === a.departmentId,
        );
        const bIndex = exam.Departments.findIndex(
          (department) => department.id === b.departmentId,
        );
        return aIndex - bIndex;
      });

      // Getting the room strength (number of students per room)
      // It will always be double of the total number of benches
      // So we need to divide it into two
      const roomStrength = template.roomStrength / 2;

      let alternateFlag = false; // To keep track of the alternate flag
      let firstPointer = 0; // To keep track of the first pointer
      let secondPointer = 0; // To keep track of the second pointer

      // Looping through all the rooms
      exam.RoomsOrder.map((room) => {
        const roomAllotments: [Student | null, Student | null][] = [];
        for (let i = 0; i < roomStrength; i++) {
          if (!alternateFlag && circuitStudents[firstPointer]) {
            roomAllotments.push([circuitStudents[firstPointer] ?? null, null]);
            alternateFlag = true;
            firstPointer++;
          } else if (alternateFlag && nonCircuitStudents[secondPointer]) {
            roomAllotments.push([
              nonCircuitStudents[secondPointer] ?? null,
              null,
            ]);
            alternateFlag = false;
            secondPointer++;
          } else if (!alternateFlag && nonCircuitStudents[secondPointer]) {
            roomAllotments.push([
              nonCircuitStudents[secondPointer] ?? null,
              null,
            ]);
            alternateFlag = true;
            secondPointer++;
          } else if (alternateFlag && circuitStudents[firstPointer]) {
            roomAllotments.push([circuitStudents[firstPointer] ?? null, null]);
            alternateFlag = false;
            firstPointer++;
          } else {
            roomAllotments.push([null, null]);
          }
        }
        allotments[room.number] = roomAllotments;
      });

      // Returning the allotments
      return allotments;
    } else {
      // Getting all the students
      const students = await db.student.findMany({
        where: {
          yearId: {
            in: exam.Years.map((year) => year.id),
          },
          departmentId: {
            in: exam.Departments.map((department) => department.id),
          },
        },
        orderBy: {
          registerNumber: "asc",
        },
      });

      // Sorting the students based on the department order
      students.sort((a, b) => {
        const aIndex = exam.Departments.findIndex(
          (department) => department.id === a.departmentId,
        );
        const bIndex = exam.Departments.findIndex(
          (department) => department.id === b.departmentId,
        );
        return aIndex - bIndex;
      });

      // Getting the room strength (number of students per room)
      // It will always be double of the total number of benches
      // So we need to divide it into two
      const roomStrength = template.roomStrength / 2;

      let studentCount = 0; // To keep track of the student index

      // Looping through all the rooms
      exam.RoomsOrder.map((room) => {
        const roomAllotments: [Student | null, Student | null][] = [];
        for (let i = 0; i < roomStrength; i++) {
          roomAllotments.push([students[studentCount] ?? null, null]);
          studentCount++;
        }
        allotments[room.number] = roomAllotments;
      });

      // Returning the allotments
      return allotments;
    }
  } else {
    if (template.isBoysGirlsSeparate) {
      if (exam.isYearsTogether) {
        const students: Record<string, Student[]> = {}; // To store all the students based on their years

        // Getting all the BOYS data
        await Promise.all(
          exam.Years.map(async (year) => {
            if (year.year === 4 && exam.Years.length === 3) {
              const s = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.DepartmentsLeftSingleYear.map(
                      (department) => department.id,
                    ),
                  },
                  gender: "Male",
                },
              });
              students[`${year.year}M LEFT`] = s;
              students[`${year.year}M LEFT`]?.sort((a, b) => {
                const aIndex = exam.DepartmentsLeftSingleYear.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.DepartmentsLeftSingleYear.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });

              const s2 = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.DepartmentsRightSingleYear.map(
                      (department) => department.id,
                    ),
                  },
                  gender: "Male",
                },
              });
              students[`${year.year}M RIGHT`] = s2;
              students[`${year.year}M RIGHT`]?.sort((a, b) => {
                const aIndex = exam.DepartmentsRightSingleYear.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.DepartmentsRightSingleYear.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });
            } else {
              const s = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.Departments.map((department) => department.id),
                  },
                  gender: "Male",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`${year.year}M`] = s;
              students[`${year.year}M`]?.sort((a, b) => {
                const aIndex = exam.Departments.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.Departments.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });
            }
          }),
        );

        // Getting all the GIRLS data
        await Promise.all(
          exam.Years.map(async (year) => {
            if (year.year === 4 && exam.Years.length === 3) {
              const s = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.DepartmentsLeftSingleYear.map(
                      (department) => department.id,
                    ),
                  },
                  gender: "Female",
                },
              });
              students[`${year.year}F LEFT`] = s;
              students[`${year.year}F LEFT`]?.sort((a, b) => {
                const aIndex = exam.DepartmentsLeftSingleYear.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.DepartmentsLeftSingleYear.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });

              const s2 = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.DepartmentsRightSingleYear.map(
                      (department) => department.id,
                    ),
                  },
                  gender: "Female",
                },
              });
              students[`${year.year}F RIGHT`] = s2;
              students[`${year.year}F RIGHT`]?.sort((a, b) => {
                const aIndex = exam.DepartmentsRightSingleYear.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.DepartmentsRightSingleYear.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });
            } else {
              const s = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.Departments.map((department) => department.id),
                  },
                  gender: "Female",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`${year.year}F`] = s;
              students[`${year.year}F`]?.sort((a, b) => {
                const aIndex = exam.Departments.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.Departments.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });
            }
          }),
        );

        // * OBJECTIVE: Fill up the allotments with just 2nd and 3rd Year students, then fill up the 4th year students

        // Girls Rooms Array so we can store it filter to get the boys rooms (leftover rooms)
        const girlsRooms: Room[] = [];

        // TODO: Change all the hardcoded 2F, 3F, 4F LEFT, 4F RIGHT to a variable

        let girlsFinished = false; // A flag to check if the girls are finished or not
        let firstPointer = 0; // A pointer to keep track of the 2nd year students
        let secondPointer = 0; // A pointer to keep track of the 3rd year students
        let thirdPointer = 0; // A pointer to keep track of the 4th year students

        // Looping through all the rooms
        exam.RoomsOrder.map((room) => {
          // If the girls are entirely alloted, then return
          if (girlsFinished) return;

          const roomAllotments: [Student | null, Student | null][] = []; // To store the allotments of the current room

          // Getting the room strength (number of students per room)
          const roomStrength = exam.isCommonRoomStrength
            ? template.roomStrength / 2 // If the room strength is common, then divide the template room strength by 2
            : room.strength / 2; // Else divide the room strength by 2

          // Looping through the room strength
          // We allocate 2 students per bench, till all of them are filled
          for (let i = 0; i < roomStrength; i++) {
            if (
              students["2F"]?.[firstPointer] &&
              students["3F"]?.[firstPointer]
            ) {
              console.log("first condition");
              roomAllotments.push([
                students["2F"][firstPointer] ?? null,
                students["3F"][firstPointer] ?? null,
              ]);
              firstPointer++;
            } else if (
              students["2F"]?.[firstPointer] &&
              students["4F RIGHT"]?.[secondPointer]
            ) {
              console.log("4th Year", students["4F RIGHT"]?.[secondPointer]);
              roomAllotments.push([
                students["2F"][firstPointer] ?? null,
                students["4F RIGHT"][secondPointer] ?? null,
              ]);
              firstPointer++;
              secondPointer++;
            } else if (
              students["4F LEFT"]?.[thirdPointer] &&
              students["3F"]?.[firstPointer]
            ) {
              console.log("4th Year", students["4F LEFT"]?.[thirdPointer]);
              roomAllotments.push([
                students["4F LEFT"][thirdPointer] ?? null,
                students["3F"][firstPointer] ?? null,
              ]);
              thirdPointer++;
              firstPointer++;
            } else if (
              students["4F LEFT"]?.[thirdPointer] &&
              students["4F RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["4F LEFT"][thirdPointer] ?? null,
                students["4F RIGHT"][secondPointer] ?? null,
              ]);
              thirdPointer++;
              secondPointer++;
            } else if (
              students["4F LEFT"]?.[thirdPointer] &&
              !students["4F RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["4F LEFT"][thirdPointer] ?? null,
                null,
              ]);
              thirdPointer++;
            } else if (
              !students["4F LEFT"]?.[thirdPointer] &&
              students["4F RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                null,
                students["4F RIGHT"][secondPointer] ?? null,
              ]);
              secondPointer++;
            } else if (students["2F"]?.[firstPointer]) {
              console.log("second condition");
              roomAllotments.push([
                students["2F"]?.[firstPointer] ?? null,
                null,
              ]);
              firstPointer++;
            } else if (students["3F"]?.[firstPointer]) {
              roomAllotments.push([
                null,
                students["3F"]?.[firstPointer] ?? null,
              ]);
              firstPointer++;
            } else {
              console.log("last condition");
              roomAllotments.push([null, null]);
            }

            girlsRooms.push(room);
          }
          allotments[room.number] = roomAllotments; // Adding the allotments to the allotments object

          // If all arrays are empty, make girlsFinished true
          if (
            firstPointer >= (students["2F"]?.length ?? 0) &&
            firstPointer >= (students["3F"]?.length ?? 0) &&
            thirdPointer >= (students["4F LEFT"]?.length ?? 0) &&
            secondPointer >= (students["4F RIGHT"]?.length ?? 0)
          ) {
            girlsFinished = true;
          }
        });

        // Initialising the boys room array
        const boysRooms: Room[] = exam.RoomsOrder.filter(
          (room) => !girlsRooms.includes(room),
        );

        firstPointer = 0; // A pointer to keep track of the 2nd year students (it is already initialised above, so we are just resetting it)
        secondPointer = 0; // A pointer to keep track of the 3rd year students (it is already initialised above, so we are just resetting it)
        thirdPointer = 0; // A pointer to keep track of the 4th year students (it is already initialised above, so we are just resetting it)

        // Looping through all the rooms
        boysRooms.map((room) => {
          const roomAllotments: [Student | null, Student | null][] = []; // To store the allotments of the current room

          // Getting the room strength (number of students per room)
          const roomStrength = exam.isCommonRoomStrength
            ? template.roomStrength / 2 // If the room strength is common, then divide the template room strength by 2
            : room.strength / 2; // Else divide the room strength by 2

          // Looping through the room strength
          // We allocate 2 students per bench, till all of them are filled
          for (let i = 0; i < roomStrength; i++) {
            if (
              students["2M"]?.[firstPointer] &&
              students["3M"]?.[firstPointer]
            ) {
              roomAllotments.push([
                students["2M"][firstPointer] ?? null,
                students["3M"][firstPointer] ?? null,
              ]);
              firstPointer++;
            } else if (
              students["2M"]?.[firstPointer] &&
              students["4M RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["2M"][firstPointer] ?? null,
                students["4M RIGHT"][secondPointer] ?? null,
              ]);
              firstPointer++;
              secondPointer++;
            } else if (
              students["4M LEFT"]?.[thirdPointer] &&
              students["3M"]?.[firstPointer]
            ) {
              roomAllotments.push([
                students["4M LEFT"][thirdPointer] ?? null,
                students["3M"][firstPointer] ?? null,
              ]);
              thirdPointer++;
              firstPointer++;
            } else if (
              students["4M LEFT"]?.[thirdPointer] &&
              students["4M RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["4M LEFT"][thirdPointer] ?? null,
                students["4M RIGHT"][secondPointer] ?? null,
              ]);
              thirdPointer++;
              secondPointer++;
            } else if (
              students["4M LEFT"]?.[thirdPointer] &&
              !students["4M RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["4M LEFT"][thirdPointer] ?? null,
                null,
              ]);
              thirdPointer++;
            } else if (
              !students["4M LEFT"]?.[thirdPointer] &&
              students["4M RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                null,
                students["4M RIGHT"][secondPointer] ?? null,
              ]);
              secondPointer++;
            } else if (students["2M"]?.[firstPointer]) {
              roomAllotments.push([
                students["2M"]?.[firstPointer] ?? null,
                null,
              ]);
              firstPointer++;
            } else if (students["3M"]?.[firstPointer]) {
              roomAllotments.push([
                null,
                students["3M"]?.[firstPointer] ?? null,
              ]);
              firstPointer++;
            } else {
              roomAllotments.push([null, null]);
            }
          }
          allotments[room.number] = roomAllotments; // Adding the allotments to the allotments object
        });

        // Returning the allotments
        return allotments;
      } else {
        // Creating the students object
        const students: Record<string, Student[]> = {
          "Male Left": [],
          "Male Right": [],
          "Female Left": [],
          "Female Right": [],
        };

        // Getting all the BOYS data
        if (
          exam.DepartmentsLeftBoys.length > 0 &&
          exam.DepartmentsRightBoys.length > 0
        ) {
          // Getting the boys data for the left side
          await Promise.all(
            exam.DepartmentsLeftBoys.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  gender: "Male",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Male Left`]?.push(...s);
            }),
          );

          // Getting the boys data for the right side
          await Promise.all(
            exam.DepartmentsRightBoys.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  gender: "Male",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Male Right`]?.push(...s);
            }),
          );

          // Sorting the left side boys according to the department order
          students[`Male Left`]?.sort((a, b) => {
            const aIndex = exam.DepartmentsLeftBoys.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.DepartmentsLeftBoys.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });

          // Sorting the right side boys according to the department order
          students[`Male Right`]?.sort((a, b) => {
            const aIndex = exam.DepartmentsRightBoys.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.DepartmentsRightBoys.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });
        } else {
          // * Since we have no left or right order mentioned here, we automatically take the Circuit/NonCircuit Approach

          // Getting the circuit boy students
          await Promise.all(
            exam.Departments.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  Department: {
                    type: "Circuit",
                  },
                  gender: "Male",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Male Left`]?.push(...s);
            }),
          );

          // Getting the non-circuit boy students
          await Promise.all(
            exam.Departments.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  Department: {
                    type: "NonCircuit",
                  },
                  gender: "Male",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Male Right`]?.push(...s);
            }),
          );

          // Sorting based on the department order
          students[`Male Left`]?.sort((a, b) => {
            const aIndex = exam.Departments.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.Departments.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });

          // Sorting based on the department order
          students[`Male Right`]?.sort((a, b) => {
            const aIndex = exam.Departments.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.Departments.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });
        }

        // Getting all the GIRLS data
        if (
          exam.DepartmentsLeftGirls.length > 0 &&
          exam.DepartmentsRightGirls.length > 0
        ) {
          //  Getting the left side girls data
          await Promise.all(
            exam.DepartmentsLeftGirls.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  gender: "Female",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Female Left`]?.push(...s);
            }),
          );

          // Getting the right side girls data
          await Promise.all(
            exam.DepartmentsRightGirls.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  gender: "Female",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Female Right`]?.push(...s);
            }),
          );

          // Sorting based on the department order
          students[`Female Left`]?.sort((a, b) => {
            const aIndex = exam.DepartmentsLeftGirls.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.DepartmentsLeftGirls.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });

          // Sorting based on the department order
          students[`Female Right`]?.sort((a, b) => {
            const aIndex = exam.DepartmentsRightGirls.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.DepartmentsRightGirls.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });
        } else {
          // * Since we have no left or right order mentioned here, we automatically take the Circuit/NonCircuit Approach

          // Getting the circuit girl students data
          await Promise.all(
            exam.Departments.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  Department: {
                    type: "Circuit",
                  },
                  gender: "Female",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Female Left`]?.push(...s);
            }),
          );

          // Getting the non-circuit girl students data
          await Promise.all(
            exam.Departments.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  Department: {
                    type: "NonCircuit",
                  },
                  gender: "Female",
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`Female Right`]?.push(...s);
            }),
          );

          // Sorting based on the department order
          students[`Female Left`]?.sort((a, b) => {
            const aIndex = exam.Departments.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.Departments.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });

          // Sorting based on the department order
          students[`Female Right`]?.sort((a, b) => {
            const aIndex = exam.Departments.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.Departments.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });
        }

        const girlsRooms: Room[] = []; // Initialising the girls rooms array, so that we can filter out for boys
        let girlsFinished = false; // A flag to check if the girls allotment is finished or not
        let firstPointer = 0; // A pointer to keep track of the left side students
        let secondPointer = 0; // A pointer to keep track of the right side students

        // Looping through all the rooms
        exam.RoomsOrder.map((room) => {
          // If the girls are entirely alloted, then return
          if (girlsFinished) return;

          const roomAllotments: [Student | null, Student | null][] = []; // To store the allotments of the current room

          // Getting the room strength (number of students per room)
          const roomStrength = exam.isCommonRoomStrength
            ? template.roomStrength / 2 // If the room strength is common, then divide the template room strength by 2
            : room.strength / 2; // Else divide the room strength by 2

          // Looping through the room strength
          // We allocate 2 students per bench, till all of them are filled
          for (let i = 0; i < roomStrength; i++) {
            if (
              students[`Female Left`]?.[firstPointer] &&
              students[`Female Right`]?.[firstPointer]
            ) {
              roomAllotments.push([
                students[`Female Left`][firstPointer] ?? null,
                students[`Female Right`][firstPointer] ?? null,
              ]);
              firstPointer++;
            } else if (students[`Female Left`]?.[firstPointer]) {
              roomAllotments.push([
                students[`Female Left`][firstPointer] ?? null,
                null,
              ]);
              firstPointer++;
            } else if (students[`Female Right`]?.[secondPointer]) {
              roomAllotments.push([
                null,
                students[`Female Right`][secondPointer] ?? null,
              ]);
              secondPointer++;
            } else {
              roomAllotments.push([null, null]);
            }
            girlsRooms.push(room);
          }
          allotments[room.number] = roomAllotments; // Adding the allotments to the allotments object

          // If all arrays are empty, make girlsFinished true
          if (
            firstPointer >= (students[`Female Left`]?.length ?? 0) &&
            secondPointer >= (students[`Female Right`]?.length ?? 0)
          ) {
            girlsFinished = true;
          }
        });

        // Initialising the boys rooms array
        const boysRooms: Room[] = exam.RoomsOrder.filter(
          (room) => !girlsRooms.includes(room),
        );

        firstPointer = 0; // The pointer to keep track of the left side students (it is already initialised above, so we are just resetting it)
        secondPointer = 0; // The pointer to keep track of the right side students (it is already initialised above, so we are just resetting it)

        // Looping through all the rooms (boys rooms)
        boysRooms.map((room) => {
          const roomAllotments: [Student | null, Student | null][] = []; // To store the allotments of the current room

          // Getting the room strength (number of students per room)
          const roomStrength = exam.isCommonRoomStrength
            ? template.roomStrength / 2 // If the room strength is common, then divide the template room strength by 2
            : room.strength / 2; // Else divide the room strength by 2

          // Looping through the room strength
          // We allocate 2 students per bench, till all of them are filled
          for (let i = 0; i < roomStrength; i++) {
            if (
              students[`Male Left`]?.[firstPointer] &&
              students[`Male Right`]?.[firstPointer]
            ) {
              roomAllotments.push([
                students[`Male Left`][firstPointer] ?? null,
                students[`Male Right`][firstPointer] ?? null,
              ]);
              firstPointer++;
            } else if (students[`Male Left`]?.[firstPointer]) {
              roomAllotments.push([
                students[`Male Left`][firstPointer] ?? null,
                null,
              ]);
              firstPointer++;
            } else if (students[`Male Right`]?.[secondPointer]) {
              roomAllotments.push([
                null,
                students[`Male Right`][secondPointer] ?? null,
              ]);
              secondPointer++;
            } else {
              roomAllotments.push([null, null]);
            }
          }
          allotments[room.number] = roomAllotments; // Adding the allotments to the allotments object
        });

        // Returning the allotments
        return allotments;
      }
    } else {
      if (exam.isYearsTogether) {
        // Creating the students object
        const students: Record<string, Student[]> = {};

        // Getting all the students data
        await Promise.all(
          exam.Years.map(async (year) => {
            if (year.year === 4 && exam.Years.length === 3) {
              const s = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.DepartmentsLeftSingleYear.map(
                      (department) => department.id,
                    ),
                  },
                },
              });
              students[`${year.year} LEFT`] = s;
              students[`${year.year} LEFT`]?.sort((a, b) => {
                const aIndex = exam.DepartmentsLeftSingleYear.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.DepartmentsLeftSingleYear.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });

              const s2 = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.DepartmentsRightSingleYear.map(
                      (department) => department.id,
                    ),
                  },
                },
              });
              students[`${year.year} RIGHT`] = s2;
              students[`${year.year} RIGHT`]?.sort((a, b) => {
                const aIndex = exam.DepartmentsRightSingleYear.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.DepartmentsRightSingleYear.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });
            } else {
              const s = await db.student.findMany({
                where: {
                  yearId: year.id,
                  departmentId: {
                    in: exam.Departments.map((department) => department.id),
                  },
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students[`${year.year}`] = s;
              students[`${year.year}`]?.sort((a, b) => {
                const aIndex = exam.Departments.findIndex(
                  (department) => department.id === a.departmentId,
                );
                const bIndex = exam.Departments.findIndex(
                  (department) => department.id === b.departmentId,
                );
                return aIndex - bIndex;
              });
            }
          }),
        );

        let firstPointer = 0; // A pointer to keep track of the 2nd year students
        let secondPointer = 0; // A pointer to keep track of the 3rd year students
        let thirdPointer = 0; // A pointer to keep track of the 4th year students

        // Since there is no boys-girls separation here, there is no need for the girlsRooms array and the girlsFinished flag

        // Looping through all the rooms
        exam.RoomsOrder.map((room) => {
          const roomAllotments: [Student | null, Student | null][] = []; // To store the allotments of the current room

          // Getting the room strength (number of students per room)
          const roomStrength = exam.isCommonRoomStrength
            ? template.roomStrength / 2 // If the room strength is common, then divide the template room strength by 2
            : room.strength / 2; // Else divide the room strength by 2

          // Looping through the room strength
          // We allocate 2 students per bench, till all of them are filled
          for (let i = 0; i < roomStrength; i++) {
            if (
              students["2"]?.[firstPointer] &&
              students["3"]?.[firstPointer]
            ) {
              roomAllotments.push([
                students["2"][firstPointer] ?? null,
                students["3"][firstPointer] ?? null,
              ]);
              firstPointer++;
            } else if (
              students["2"]?.[firstPointer] &&
              students["4 RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["2"][firstPointer] ?? null,
                students["4 RIGHT"][secondPointer] ?? null,
              ]);
              firstPointer++;
              secondPointer++;
            } else if (
              students["4 LEFT"]?.[thirdPointer] &&
              students["3"]?.[firstPointer]
            ) {
              roomAllotments.push([
                students["4 LEFT"][thirdPointer] ?? null,
                students["3"][firstPointer] ?? null,
              ]);
              thirdPointer++;
              firstPointer++;
            } else if (
              students["4 LEFT"]?.[thirdPointer] &&
              students["4 RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["4 LEFT"][thirdPointer] ?? null,
                students["4 RIGHT"][secondPointer] ?? null,
              ]);
              thirdPointer++;
              secondPointer++;
            } else if (
              students["4 LEFT"]?.[thirdPointer] &&
              !students["4 RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                students["4 LEFT"][thirdPointer] ?? null,
                null,
              ]);
              thirdPointer++;
            } else if (
              !students["4 LEFT"]?.[thirdPointer] &&
              students["4 RIGHT"]?.[secondPointer]
            ) {
              roomAllotments.push([
                null,
                students["4 RIGHT"][secondPointer] ?? null,
              ]);
              secondPointer++;
            } else if (students["2"]?.[firstPointer]) {
              roomAllotments.push([
                students["2"]?.[firstPointer] ?? null,
                null,
              ]);
              firstPointer++;
            } else if (students["3"]?.[firstPointer]) {
              roomAllotments.push([
                null,
                students["3"]?.[firstPointer] ?? null,
              ]);
              firstPointer++;
            } else {
              roomAllotments.push([null, null]);
            }
          }
          allotments[room.number] = roomAllotments; // Adding the allotments to the allotments object
        });

        // Returning the allotments
        return allotments;
      } else {
        // Creating the students object
        const students: Record<string, Student[]> = {
          Left: [],
          Right: [],
        };

        // Getting all the students data
        // Here since there is no boys-girls separation, we can directly use the DepartmentsLeftBoys and DepartmentsRightBoys arrays for girls too
        if (
          exam.DepartmentsLeftBoys.length > 0 &&
          exam.DepartmentsRightBoys.length > 0
        ) {
          // Getting the left side students data
          await Promise.all(
            exam.DepartmentsLeftBoys.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students.Left?.push(...s);
            }),
          );

          // Getting the right side students data
          await Promise.all(
            exam.DepartmentsRightBoys.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students.Right?.push(...s);
            }),
          );

          // Sorting the left side students based on the department order
          students.Left?.sort((a, b) => {
            const aIndex = exam.DepartmentsLeftBoys.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.DepartmentsLeftBoys.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });

          // Sorting the right side students based on the department order
          students.Right?.sort((a, b) => {
            const aIndex = exam.DepartmentsRightBoys.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.DepartmentsRightBoys.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });
        } else {
          // * Since we have no left or right order mentioned here, we automatically take the Circuit/NonCircuit Approach

          // Getting the circuit students data
          await Promise.all(
            exam.Departments.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  Department: {
                    type: "Circuit",
                  },
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students.Left?.push(...s);
            }),
          );

          // Getting the non-circuit students data
          await Promise.all(
            exam.Departments.map(async (department) => {
              const s = await db.student.findMany({
                where: {
                  yearId: {
                    in: exam.Years.map((year) => year.id),
                  },
                  departmentId: department.id,
                  Department: {
                    type: "NonCircuit",
                  },
                },
                orderBy: {
                  registerNumber: "asc",
                },
              });
              students.Right?.push(...s);
            }),
          );

          // Sorting the left side students based on the department order
          students.Left?.sort((a, b) => {
            const aIndex = exam.Departments.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.Departments.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });

          // Sorting the right side students based on the department order
          students.Right?.sort((a, b) => {
            const aIndex = exam.Departments.findIndex(
              (department) => department.id === a.departmentId,
            );
            const bIndex = exam.Departments.findIndex(
              (department) => department.id === b.departmentId,
            );
            return aIndex - bIndex;
          });
        }

        let firstPointer = 0; // A pointer to keep track of the left side students
        let secondPointer = 0; // A pointer to keep track of the right side students

        // Looping through all the rooms
        exam.RoomsOrder.map((room) => {
          const roomAllotments: [Student | null, Student | null][] = []; // To store the allotments of the current room

          // Getting the room strength (number of students per room)
          const roomStrength = exam.isCommonRoomStrength
            ? template.roomStrength / 2 // If the room strength is common, then divide the template room strength by 2
            : room.strength / 2; // Else divide the room strength by 2

          // Looping through the room strength
          // We allocate 2 students per bench, till all of them are filled
          for (let i = 0; i < roomStrength; i++) {
            if (
              students.Left?.[firstPointer] &&
              students.Right?.[firstPointer]
            ) {
              roomAllotments.push([
                students.Left[firstPointer] ?? null,
                students.Right[firstPointer] ?? null,
              ]);
              firstPointer++;
            } else if (students.Left?.[firstPointer]) {
              roomAllotments.push([students.Left[firstPointer] ?? null, null]);
              firstPointer++;
            } else if (students.Right?.[secondPointer]) {
              roomAllotments.push([
                null,
                students.Right[secondPointer] ?? null,
              ]);
              secondPointer++;
            } else {
              roomAllotments.push([null, null]);
            }
          }
          allotments[room.number] = roomAllotments; // Adding the allotments to the allotments object
        });

        // Returning the allotments
        return allotments;
      }
    }
  }
}
