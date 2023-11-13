import TemplateForm from "@/components/forms/TemplateForm";
import { api } from "@/trpc/server";

const TemplateFormPage = async () => {
  const buildings = await api.building.getBuildings.query();
  const requiredBuildings = buildings.map((building) => ({
    value: building.name,
    label: building.name,
  }));

  const rooms = await api.room.getRooms.query();
  const requiredRooms = rooms.map((room) => ({
    value: room.number,
    label: room.number,
  }));

  const logos = await api.template.getLogos.query();
  const requiredLogos = logos.map((logo) => ({
    value: String(logo.id),
    label: logo.name,
  }));

  return (
    <div className="w-full p-8">
      <p className="mb-8 text-4xl font-bold">Create new template</p>
      <TemplateForm buildings={requiredBuildings} rooms={requiredRooms} logos={requiredLogos} />
    </div>
  );
};

export default TemplateFormPage;
