"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

const DeleteStudentButton = ({ id }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const deleteStudent = api.student.deleteStudent.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <Button
      variant={"destructive"}
      className="w-full"
      onClick={() => {
        startTransition(async () => {
          await deleteStudent.mutateAsync({
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
