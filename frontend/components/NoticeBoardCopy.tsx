// import React from 'react'
import Page from "../components/PotraitPage";
import Image from "next/image";

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

type Props = {
  ranges: Ranges;
  exam: Exam;
  date: string;
  room: string;
  logoUrl: string;
};

const NoticeBoardCopy = ({ ranges, exam, date, room, logoUrl }: Props) => {
  console.log("RANGES WE GOT", ranges);


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

function getDates(timeTable) {
    const dates = [];
    for (const course in timeTable) {
      for (const date in timeTable[course]) {
        if (!dates.includes(date)) {
          dates.push(date);
        }
      }
    }
    return dates;
  }
  

  const createRange = (ranges) => {
    console.log("RANGES at Create Ranges", ranges);
    const dates = getDates(exam.time_table);
    let total = [];
    let temp = [];
    let table = [];
    let tableCount = 0;


    // temp.push(<tr className="text-3xl font-medium">Room  {room.toUpperCase()} </tr>);

    // temp.push(<tr></tr>);
    // total.push(<tbody>{temp}</tbody>)

    // {Object.keys(ranges).map((key) => {
    //     return Object.keys(ranges[key]).map((dept) => {
    //         console.log("ROOM", dept);
    //         return Object.keys(ranges[key][dept]).map((student) => {
    //         console.log("STUDENT", ranges[key][dept][student]);
    //         temp.push(
    //             // <div>   
    //             //     <h1>{student}</h1>
    //             // </div>
                // <tr>
                //     <td className="border-2 border-black text-xs p-1">{++tableCount}</td>
                //     <td className="border-2 border-black text-xs p-1">{ranges[key][dept][student][0]}</td>
                //     <td className="border-2 border-black text-xs p-1">{ranges[key][dept][student][4]}</td>
                //     <td className="border-2 border-black text-xs p-1">{ranges[key][dept][student][1].toUpperCase()}</td>
                //     {dates.map((date) => {
                //         return <td className="border-2 border-black text-xs p-1" width={100}></td>;
                //     })
                //     }
                // </tr>
    //         );
    //         });

            
    //     });
    //     })
    // }

    Object.keys(ranges).map((dept)=>{
      return Object.keys(ranges[dept]).map((student)=>{
        console.log("STUDENT", ranges[dept][student]);
        temp.push(
          <tr>
          <td className="border-2 border-black text-xs p-1">{++tableCount}</td>
          <td className="border-2 border-black text-xs p-1">{ranges[dept][student][0]}</td>
          <td className="border-2 border-black text-xs p-1">{ranges[dept][student][4]}</td>
          <td className="border-2 border-black text-xs p-1">{ranges[dept][student][1].toUpperCase()}</td>
          {dates.map((date) => {
              return <td className="border-2 border-black text-xs p-1" width={100}></td>;
          })
          }
      </tr>
          
        )
      })
    })

    table.push(
        <table className={`border-2 border-black text-md p-2 `}>
            <thead>
                <tr >
                    <th colSpan={12} className="text-3xl font-medium border-2 border-black  p-2"> Room {room.toUpperCase()} </th>
                </tr>
                <tr>
                    <th className="border-2 border-black text-xs p-2" >S.No</th>
                    <th className="border-2 border-black text-xs p-2" >Reg. No</th>
                    <th className="border-2 border-black text-xs p-2" >Name</th>
                    <th className="border-2 border-black text-xs p-2" >Dept</th>
                    {dates.map((date) => {
                        return <th className="border-2 border-black text-xs p-2" >{date}</th>;
                    })
                    }
                </tr>
            </thead>
            <tbody>
                {temp}
            </tbody>
        </table>

    )
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
