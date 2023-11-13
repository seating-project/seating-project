"use client";

import React from "react";

import { api } from "@/trpc/react";

import { Button } from "../ui/button";

type Props = {
  id: number;
};

const DeleteButton = (props: Props) => {
  const [deleted, setDeleted] = React.useState(false);

  const deleteExam = api.exam.delete.useMutation({
    onSuccess: () => {
      setDeleted(true);
    },
  });

  const handleDeleteClick = async () => {
    await deleteExam.mutateAsync({
      id: props.id,
    });
  };

  return (
    <div>
      <Button
        variant="destructive"
        className="w-full"
        onClick={handleDeleteClick}
        disabled={deleted}
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteButton;
