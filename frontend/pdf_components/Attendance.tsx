import Image from "next/image";

const Attendance = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <Image src="/cit.png" alt="logo" width={308} height={380} />
        <h1 className="text-4xl font-semibold p-4"></h1>
      </div>
    </div>
  );
};

export default Attendance;
