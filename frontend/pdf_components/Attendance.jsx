import Image from "next/image";

const Attendance = ({ranges, dept}) => {
  


  const createAttendance = () => {
    return (
      <div>
        <table className="table-auto border-2 border-black">
          <thead>
            <tr className="font-bold text-xl p-2">
              <td colSpan={5} className="p-2 text-center bg-screen">
                Branch: {dept.toUpperCase() + YEARSUFFIX[dept.slice(-1)]} Year
              </td>
            </tr>
            <tr className="font-bold text-xl p-2">
              <td className="p-2 text-center bg-screen">Room No.</td>
              <td className="p-2 text-center bg-screen">Name</td>
              <td className="p-2 text-center bg-screen">Roll No.</td>
              <td className="p-2 text-center bg-screen">Signature</td>
              <td className="p-2 text-center bg-screen">Date</td>
            </tr>
          </thead>
          <tbody>
            {ranges.map((range) => {
              let room = Object.keys(range)[0];
              let range1 = range[room];
              return (
                <tr>
                  <td className="p-2 text-center bg-screen">{room}</td>
                  <td className="p-2 text-center bg-screen">
                    {range1[0].toUpperCase() + range1.slice(1)}
                  </td>
                  <td className="p-2 text-center bg-screen">{range1}</td>
                  <td className="p-2 text-center bg-screen"></td>
                  <td className="p-2 text-center bg-screen"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <Image src="/cit.png" alt="logo" width={308} height={380} />
        <h1 className="text-4xl font-semibold p-4"></h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        {/* {createAttendance()} */}
        
      </div>
    </div>
  );
};

export default Attendance;
