import React from "react";
import Image from "next/image";


const YEARSUFFIX = {
    1: "st",
    2: "nd",
    3: "rd",
    4: "th",
  };

const NoticeBoardCopy = ({ ranges, exam }) => {

    const roomRanges = (room) => {
        const range = ranges[room];
        let r = []
        let code = []
        let code1 = []
        r.push(<td className="border-2 text-center font-bold" >{room}</td>)
        Object.keys(range).forEach((key) => {
            let start = range[key][0];
            let end = range[key][range[key].length-1];
            let count = range[key].length;
            code.push(<p><b>{key.toUpperCase() + YEARSUFFIX[parseInt(key.slice(-1))] + " Year"}</b> {start[0] + "-" + end[0]} </p>);
            code.push(<br/>)
            code1.push(<p> {count} </p>);
            // code1.push(<br/>)
        })
        r.push(<td className="border-2 p-4 text-center px-4">{code}</td>)
        r.push(<td className="border-2 p-4 text-center">{code1}</td>)
        return r;
    }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <Image src="/cit.png" alt="logo" width={250} height={300} />
        <h1 className="text-2xl font-semibold">{exam}</h1>
      </div>
      <div className="flex flex-col">
        <table className="border-2 ">
          <thead>
            <tr>
              <th className="border-2 p-4">Room</th>
              <th className="border-2 p-4">Dept and Year</th>
              <th className="border-2 p-4">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(ranges).map((room) => {
                return (
                    <tr className="border-2 p-4">
                        {roomRanges(room)}
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeBoardCopy;
