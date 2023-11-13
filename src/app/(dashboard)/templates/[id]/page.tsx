import React from "react";

import UpdateTemplateForm from "@/components/forms/UpdateTemplateForm";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

const TemplatePage = async (props: Props) => {
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
    value: logo.name,
    label: logo.name,
  }));

  const template = await api.template.getTemplate.query({
    id: Number(decodeURIComponent(props.params.id)),
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
