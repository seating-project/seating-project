import { DataTableLoading } from "@/components/client/DataTableLoading";

const DepartmentLoadingPage = () => {
  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Departments</p>
        <div className="my-4">
          <DataTableLoading columnCount={6} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentLoadingPage;
