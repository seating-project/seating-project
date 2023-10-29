import { DataTableLoading } from "@/components/client/DataTableLoading";

const TemplateLoadingPage = () => {
  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Templates</p>
        <div className="my-4">
          <DataTableLoading columnCount={5} />
        </div>
      </div>
    </div>
  );
};

export default TemplateLoadingPage;
