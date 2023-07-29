import TemplateTable from "@/components/tables/TemplatesTable";
import { api } from "@/trpc/server";


export default async function TemplatePage() {

  const templates = await api.template.getTemplates.query();

  const requiredTemplateData = templates.map((template) => {
    return {
      id: template.id,
      name: template.name,
      roomStrength: template.roomStrength,
      startTime: template.startTime,
      endTime: template.endTime,
    };
  });

  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Templates</p>
        <div className="my-4">
          <TemplateTable data={requiredTemplateData} />
        </div>
      </div>
    </div>
  );
}
