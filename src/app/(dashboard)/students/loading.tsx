import { DataTableLoading } from "@/components/client/DataTableLoading";

const StudentLoadingPage = () => {
  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <div className="my-4">
          <DataTableLoading columnCount={7} />
        </div>
      </div>
    </div>
  );
};

export default StudentLoadingPage;
