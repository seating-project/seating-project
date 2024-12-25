import React from "react";

import UpdateTemplateForm from "@/components/forms/UpdateTemplateForm";
import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const TemplatePage = async (props: Props) => {
  const params = await props.params;
  const buildings = await api.building.getBuildings();
  const requiredBuildings = buildings.map((building) => ({
    value: building.name,
    label: building.name,
  }));

  const rooms = await api.room.getRooms();
  const requiredRooms = rooms.map((room) => ({
    value: room.number,
    label: room.number,
  }));

  const logos = await api.template.getLogos();
  const requiredLogos = logos.map((logo) => ({
    value: String(logo.id),
    label: logo.name,
  }));

  const template = await api.template.getTemplate({
    id: Number(decodeURIComponent(params.id)),
  });

  return (
    <div className="w-full p-8">
      <p className="mb-8 text-4xl font-bold">
        Template {template?.name} (ID: {template?.id})
      </p>
      <UpdateTemplateForm
        buildings={requiredBuildings}
        rooms={requiredRooms}
        logos={requiredLogos}
        template={template}
      />
    </div>
  );
};

export default TemplatePage;
