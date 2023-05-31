// import React from 'react'
import Page from "../components/PotraitPage";
import Image from "next/image";
import styles from "../styles/Notice.module.css";

interface Departments {
  [building: string]: string[];
}

interface TimeTable {
  [dept: string]: {
    [date: string]: string;
  };
}

interface Exam {
  exam_name: string;
  from_date: string;
  to_date: string;
  departments: Departments;
  time_table: TimeTable;
  is_phd: boolean;
  is_me: boolean;
  is_years_together: boolean;
  is_departments_together: boolean;
  is_send_whatsapp_message: boolean;
  time_to_send_whatsapp_message: string | null;
  exam_template: string;
  no_of_sets: number | null;
  second_column_options: string;
  phd_room: string | null;
  me_room: string | null;
  years: string[];
  phd_students: string[];
  sets_for_which_subjects: string[];
}

// interface Building {
//   [key: string]: {
//     [key: string]: {
//       boys: Record<string, unknown>;
//       girls: Record<string, unknown>;
//     };
//   };
// }

interface Ranges {
  boys: {
    [key: string]: Array<Array<any>> | any;
  };
  girls: {
    [key: string]: Array<Array<any>> | any;
  };
}

interface Ranges2 {
  [key: string]: Array<Array<any>> | any;
}

type Props = {
  ranges: Ranges | Ranges2;
  exam: Exam;
  date: string;
  room: string;
  logoUrl: string;
  isbg: boolean;
};

interface SuffixType  {
  [key: string]: string;
}

const SUFFIX: SuffixType = {
  "1": "st",
  "2": "nd",
  "3": "rd",
  "4": "th",
};

const NoticeBoardCopy = ({
  ranges,
  exam,
  date,
  room,
  logoUrl,
  isbg,
}: Props) => {
  console.log("RANGES WE GOT", ranges);
  console.log("CURRENT ROOM", room);

  //   let dept_and_their_ranges = {};
  //   Object.keys(ranges[]).forEach((k) => {
  //     console.log("ROOMIE", k);
  //     Object.keys(ranges[k]).forEach((key1) => {
  //       let dept = key1;
  //       let roomie = k;
  //       if (dept_and_their_ranges[dept]) {
  //         let obj = {};
  //         obj[roomie] = ranges[roomie][key1];
  //         dept_and_their_ranges[dept].push(obj);
  //       } else {
  //         let obj1 = {};
  //         obj1[roomie] = ranges[roomie][key1];
  //         dept_and_their_ranges[dept] = [obj1];
  //       }
  //     });
  //   });

  function getDates(timeTable: any) {
    const dates: string[] = [];
    for (const course in timeTable) {
      for (const date in timeTable[course]) {
        if (!dates.includes(date)) {
          dates.push(date);
        }
      }
    }
    return dates;
  }

  const createRange = (ranges: Ranges | Ranges2) => {
    console.log("RANGES at Create Ranges", ranges);
    const dates = getDates(exam.time_table);
    let total = [];
    let temp = [];
    let table = [];
    let tableCount = 0;

    if (isbg) {
      // temp.push(
      //   <tr className="text-3xl font-medium">Room {room.toUpperCase()} </tr>
      // );

      temp.push(<tr></tr>);
      total.push(<tbody>{temp}</tbody>);

      Object.keys(ranges).map((key) => {
        return Object.keys(ranges[key]).map((dept) => {
          console.log("ROOM", dept);
          temp.push(
            <tr
              className={`text-2xl font-medium text-center justify-items-center items-center border-black ${styles.unbreak}`}
            >
              {" "}
              <td colSpan={10}>
                {" "}
                {dept.toUpperCase()}
                {SUFFIX[dept.split(" ")[1]].toUpperCase()} Year{" "}
              </td>{" "}
            </tr>
          );
          return Object.keys(ranges[key][dept]).map((student) => {
            console.log("STUDENT", ranges[key][dept][student]);
            temp.push(
              // <div>
              //     <h1>{student}</h1>
              // </div>
              <tr className={styles.unbreak}>
                <td className="border-2 border-black text-xs p-1">
                  {++tableCount}
                </td>
                <td className="border-2 border-black text-xs p-1">
                  {ranges[key][dept][student][0]}
                </td>
                <td className="border-2 border-black text-xs p-1">
                  {ranges[key][dept][student][4]}
                </td>
                <td className="border-2 border-black text-xs p-1">
                  {ranges[key][dept][student][1].toUpperCase()}
                </td>
                {/* {dates.map((date) => {
                      // if (date=="2023-04-17" || date=="2023-04-18" || date=="2023-04-19" || date=="2023-04-20" || date=="2023-04-21" ) {
                      //   return <td className="border-2 border-black text-xs p-1" width={100}></td>;
                      // }
                      if (date=="2023-04-22") {
                        return <td className="border-2 border-black text-xs p-1" width={100}></td>;
                      }
                    })
                    } */}
                {/* <th className="border-2 border-black text-xs p-2">
                  __________
                </th>
                <th className="border-2 border-black text-xs p-2">
                  __________
                </th>
                <th className="border-2 border-black text-xs p-2">
                  __________
                </th>
                <th className="border-2 border-black text-xs p-2">
                  __________
                </th>
                <th className="border-2 border-black text-xs p-2">
                  __________
                </th> */} 
                <th className="border-2 border-black text-xs p-2">
                  __________
                </th>
              </tr>
            );
          });
        });
      });
    } else {
      Object.keys(ranges).map((dept) => {
        temp.push(
          <tr
            className={`text-2xl font-medium text-center justify-items-center items-center border-black ${styles.unbreak}`}
          >
            {" "}
            <td colSpan={10}>
              {" "}
              {dept.toUpperCase()}
              {SUFFIX[dept.split(" ")[1]]} Year{" "}
            </td>{" "}
          </tr>
        );
        return Object.keys(ranges[dept]).map((student) => {
          console.log("STUDENT", ranges[dept][student]);
          temp.push(
            <tr>
              <td className="border-2 border-black text-xs p-1">
                {++tableCount}
              </td>
              <td className="border-2 border-black text-xs p-1">
                {ranges[dept][student][0]}
              </td>
              <td className="border-2 border-black text-xs p-1">
                {ranges[dept][student][4]}
              </td>
              <td className="border-2 border-black text-xs p-1">
                {ranges[dept][student][1].toUpperCase()}
              </td>
              {/* {dates.map((date) => {
                return <td className="border-2 border-black text-xs p-1" width={100}></td>;
            })
            } */}
              <td className="border-2 border-black text-xs p-1">__________</td>
              <td className="border-2 border-black text-xs p-1">__________</td>
              <td className="border-2 border-black text-xs p-1">__________</td>
              <td className="border-2 border-black text-xs p-1">__________</td>
              <td className="border-2 border-black text-xs p-1">__________</td>
              <td className="border-2 border-black text-xs p-1">__________</td>
            </tr>
          );
        });
      });
    }

    table.push(
      <table className={`border-2 border-black text-md p-2 `}>
        <thead className={styles.unbreak}>
          <tr>
            <th
              colSpan={10}
              className="text-3xl font-medium border-2 border-black  p-2"
            >
              {" "}
              {exam.exam_name}{" "}
            </th>
          </tr>
          <tr>
            <th
              colSpan={10}
              className="text-3xl font-medium border-2 border-black  p-2"
            >
              {" "}
              Room {room.toUpperCase()}{" "}
            </th>
          </tr>
          <tr>
            <th className="border-2 border-black text-xs p-2">S.No</th>
            <th className="border-2 border-black text-xs p-2">Reg. No</th>
            <th className="border-2 border-black text-xs p-2">Name</th>
            <th className="border-2 border-black text-xs p-2">Dept</th>
            {/* {dates.map((date) => {
                      // if (date=="2023-04-27" || date=="2023-04-28" || date=="2023-04-29" || date=="2023-04-20" || date=="2023-04-22" ) {
                      //   return <th className="border-2 border-black text-xs p-2" >{date}</th>;
                      // }
                      if (date=="2023-04-28") {
                        return <th className="border-2 border-black text-xs p-2" >{date}</th>;
                      }
                    })
                    } */}
            <th className="border-2 border-black text-xs p-2">__________</th>
            <th className="border-2 border-black text-xs p-2">__________</th>
            <th className="border-2 border-black text-xs p-2">__________</th>
            <th className="border-2 border-black text-xs p-2">__________</th>
            <th className="border-2 border-black text-xs p-2">__________</th>
            <th className="border-2 border-black text-xs p-2">__________</th>
          </tr>
        </thead>
        <tbody>{temp}</tbody>
      </table>
    );
    return table;
  };

  return (
    <Page>
      <div className="flex flex-col items-center ">
        {/* {Object.keys(ranges).map((key) => {
          return Object.keys(ranges[key]).map((room) => {
            console.log("ROOM", room);
            return (
              <div>
                <h1>{room}</h1>
              </div>
            );
          });
        })} */}
        <Image
          src={`data:image/png;base64,${logoUrl}`}
          width={500}
          height={400}
          alt="dasd"
          className="object-contain pr-4"
        />

        {createRange(ranges)}
      </div>
    </Page>
  );
};

export default NoticeBoardCopy;
