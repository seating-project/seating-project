"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { api } from "@/trpc/client";
import { toast } from "../ui/use-toast";

type Props = {
  id: number;
};

const DeleteStudentButton = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant={"destructive"}
      className="w-full"
      onClick={() => {
        startTransition(async () => {
          const deleteStudent = await api.student.deleteStudent.mutate({
            id: id,
          });
          if (deleteStudent) {
            toast({
              title: "Student deleted",
              description: "Student has been deleted successfully",
              duration: 3000,
            });
          }
        });
      }}
      disabled={isPending}
    >
      Delete student
    </Button>
  );
};

export default DeleteStudentButton;
