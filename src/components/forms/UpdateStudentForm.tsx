"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Student, type Option } from "@/types";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { studentFormSchema } from "@/lib/schema";

type Props = {
  student: Student;
  departments: Option[];
  years: Option[];
  degrees: Option[];
};

const UpdateStudentForm = ({ student, departments, years, degrees }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateStudent = api.student.updateStudent.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student.name,
      registerNumber: student.registerNumber,
      phoneNumber: student.phoneNumber ?? "",
      degree: student.degree,
      department: student.department,
      year: student.year,
      gender: student.gender,
    },
  });

  function onSubmit(values: z.infer<typeof studentFormSchema>) {
    startTransition(async () => {
      console.log(values)
      if (values.phoneNumber === null) {
        values.phoneNumber = "";
      }
      await updateStudent.mutateAsync({
        id: student.id,
        name: values.name,
        registerNumber: values.registerNumber,
        phoneNumber: values.phoneNumber ?? "",
        degree: values.degree,
        department: values.department,
        year: Number(values.year),
        gender: values.gender,
      });

      if (updateStudent) {
        toast({
          title: "Student Updated",
          description: "Student has been updated successfully",
        });
        form.reset();
        router.push("/students");
      }
    });
  }
  return (
    <Form {...form}>
      <form
        className="flex w-full  gap-x-8 text-black dark:text-white"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-1/2 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Roshan"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>This is your student name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registerNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Register Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2104XXXXXXXX..."
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  This is your student register number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem value={String(year.value)} key={year.value}>
                        {" "}
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>This is your student year</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  This is your student phone number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-1/2 flex-col justify-around space-y-4">
          <div>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Department</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem
                            value={String(department.value)}
                            key={department.value}
                          >
                            {" "}
                            {department.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      This is your student department
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Degree" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {degrees.map((degree) => (
                        <SelectItem
                          value={String(degree.value)}
                          key={degree.value}
                        >
                          {" "}
                          {degree.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>This is your student degree</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Male"}>Male</SelectItem>
                      <SelectItem value={"Female"}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>This is your student gender</FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-4 w-full self-end justify-self-end"
            variant="default"
            disabled={isPending}
            onClick={() => onSubmit(form.getValues())}
            // onSubmit={() => onSubmit(form.getValues())}
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateStudentForm;
