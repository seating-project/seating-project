"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SecondColumnOptions } from "@prisma/client";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FancyMultiSelect, type Data } from "@/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { examFormSchema } from "@/lib/schema";
import { cn, convertToISODate, generateDateRange } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Option, type Template, type TimeTable } from "@/types";

type Props = {
  departments: Option[];
  templates: Option[];
  years: Option[];
  templateData: Template[];
  colleges: Option[];
};

const CreateExamForm = ({
  departments,
  templates,
  years,
  templateData,
  colleges,
}: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [rooms, setRooms] = useState<Data[]>([]);
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [timeTable, setTimeTable] = useState<TimeTable>({});

  const createExam = api.exam.createExam.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examDates: {
        from: new Date(),
        to: addDays(new Date(), 6),
      },
      departments: [],
      template: "",
      minimumStudentsInRoom: 0,
      randomizeEveryNRooms: 0,
      isCommonRoomStrength: false,
      strictlyDivideBuildings: false,
      isPhd: false,
      isDepartmentsTogether: false,
      isYearsTogether: false,
      isSendWhatsappMessage: false,
      isMe: false,
    },
  });

  useEffect(
    () => {
      form.getValues("template") !== "" &&
        setRooms(
          templateData
            .find((template) => form.getValues("template") === template.name)
            ?.Rooms.map((room) => {
              return {
                label: room.number,
                value: room.number,
              };
            }) as Data[],
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, form.getValues("template")],
  );

  function onSubmit(
    values: z.infer<typeof examFormSchema>,
    timetable: TimeTable,
  ) {
    startTransition(async () => {
      console.log(values);
      await createExam.mutateAsync({
        name: values.name,
        template: values.template,
        college: values.college,
        departments: values.departments,
        departmentsLeftBoys: values.departmentsLeftBoys,
        departmentsRightBoys: values.departmentsRightBoys,
        departmentsLeftGirls: values.departmentsLeftGirls,
        departmentsRightGirls: values.departmentsRightGirls,
        years: values.years,
        examDates: values.examDates,
        roomsOrder: values.roomsOrder,
        minimumStudentsInRoom: values.minimumStudentsInRoom,
        randomizeEveryNRooms: values.randomizeEveryNRooms,
        isCommonRoomStrength: values.isCommonRoomStrength,
        strictlyDivideBuildings: values.strictlyDivideBuildings,
        isPhd: values.isPhd,
        isDepartmentsTogether: values.isDepartmentsTogether,
        isYearsTogether: values.isYearsTogether,
        isSendWhatsappMessage: values.isSendWhatsappMessage,
        isMe: values.isMe,
        secondColumnOptions: values.secondColumnOptions,
        timeTable: timetable,
      });
      console.log(createExam);
      console.log(timetable);

      createExam
        ? toast({
            title: "Exam Created",
            description: "Exam has been created successfully",
          })
        : toast({
            title: "Exam Creation Failed",
            description: "Exam could not be created",
          });
    });
  }

  return (
    <Form {...form}>
      <form>
        <div className="flex w-full">
          <ScrollArea className="form-area w-1/3 border-r">
            <div className=" p-8">
              <p className="text-2xl font-bold">Create New Exam</p>
              <div className="my-4 w-full">
                <div className="flex w-full flex-col gap-x-8 text-black dark:text-white">
                  <div className="w-full space-y-4">
                    <div className="space-y-4 py-4">
                      <p>
                        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Basic Details
                        </span>
                      </p>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="IA 1"
                                {...field}
                                disabled={isPending}
                                className="w-full"
                              />
                            </FormControl>
                            <FormDescription>
                              This is the exam name
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="template"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="capitalize">
                                  <SelectValue
                                    placeholder={"Select Template..."}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {templates.map((template) => (
                                      <SelectItem
                                        key={template.value}
                                        value={String(template.value)}
                                      >
                                        {template.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              This is the exam template
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="college"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="capitalize">
                                  <SelectValue
                                    placeholder={"Select College..."}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {colleges.map((college) => (
                                      <SelectItem
                                        key={college.value}
                                        value={String(college.value)}
                                      >
                                        {college.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              This is the exam college
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="examDates"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Exam Dates</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      variant={"outline"}
                                      className={cn(
                                        "w-[260px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value?.from ? (
                                        field.value.to ? (
                                          <>
                                            {format(
                                              field.value.from,
                                              "LLL dd, y",
                                            )}{" "}
                                            -{" "}
                                            {format(
                                              field.value.to,
                                              "LLL dd, y",
                                            )}
                                          </>
                                        ) : (
                                          format(field.value.from, "LLL dd, y")
                                        )
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="end"
                                  >
                                    <Calendar
                                      initialFocus
                                      mode="range"
                                      defaultMonth={field.value?.from}
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      numberOfMonths={2}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                            </div>
                            <FormDescription>
                              This is the exam from and to date
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="departments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Departments</FormLabel>
                            <FormControl>
                              <FancyMultiSelect
                                onChange={(values) => {
                                  field.onChange(
                                    values.map(({ value }) => value),
                                  );
                                }}
                                data={departments}
                                name="departments"
                              />
                            </FormControl>
                            <FormDescription>
                              This is the exam departments
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="years"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years</FormLabel>
                            <FormControl>
                              <FancyMultiSelect
                                onChange={(values) => {
                                  field.onChange(
                                    values.map(({ value }) => value),
                                  );
                                }}
                                data={years}
                                name="years"
                              />
                            </FormControl>
                            <FormDescription>
                              This is the exam years
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2 py-4">
                      <p>
                        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Exam Type
                        </span>
                      </p>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="isYearsTogether"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-2 leading-none">
                                <FormLabel>
                                  Are different year students seated together?
                                </FormLabel>
                                <FormDescription>
                                  Allows students from different years to be in
                                  the same bench. Useful for exams that have
                                  different years in the same exam
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="isDepartmentsTogether"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-2 leading-none">
                                <FormLabel>
                                  Are different departments students seated
                                  together?
                                </FormLabel>
                                <FormDescription>
                                  Allows students from different departments to
                                  be in the same bench. Useful for exams that
                                  have different departments in the same exam
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 py-4">
                      <p>
                        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Other Students
                        </span>
                      </p>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="isPhd"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-2 leading-none">
                                <FormLabel>Include Ph.D Students?</FormLabel>
                                <FormDescription>
                                  This will allow you to add Ph.D students to
                                  the exam
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="isMe"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-2 leading-none">
                                <FormLabel>Include M.E. Students?</FormLabel>
                                <FormDescription>
                                  This will allow you to add M.E. students to
                                  the exam
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {form.getValues("isDepartmentsTogether") &&
                    form.getValues("departments").length != 0 ? (
                      <div className="space-y-2 py-2">
                        <p>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Departments Order and flow
                          </span>
                        </p>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="departmentsLeftBoys"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Departments in Left Row (Boys)
                                </FormLabel>
                                <FormControl>
                                  <FancyMultiSelect
                                    onChange={(values) => {
                                      field.onChange(
                                        values.map(({ value }) => value),
                                      );
                                    }}
                                    data={form
                                      .getValues("departments")
                                      .map((dept) => ({
                                        label: dept,
                                        value: dept,
                                      }))}
                                    name="departmentsLeftBoys"
                                  />
                                </FormControl>
                                <FormDescription>
                                  All the departments that are in the left row,
                                  specifically for the boys.
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="departmentsRightBoys"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Departments in Right Row (Boys)
                                </FormLabel>
                                <FormControl>
                                  <FancyMultiSelect
                                    onChange={(values) => {
                                      field.onChange(
                                        values.map(({ value }) => value),
                                      );
                                    }}
                                    data={form
                                      .getValues()
                                      .departments.map((dept) => ({
                                        label: dept,
                                        value: dept,
                                      }))}
                                    name="departmentsRightBoys"
                                  />
                                </FormControl>
                                <FormDescription>
                                  All the departments that are in the right row,
                                  specifically for the boys.
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="departmentsLeftGirls"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Departments in Left Row (Girls)
                                </FormLabel>
                                <FormControl>
                                  <FancyMultiSelect
                                    onChange={(values) => {
                                      field.onChange(
                                        values.map(({ value }) => value),
                                      );
                                    }}
                                    data={form
                                      .getValues()
                                      .departments.map((dept) => ({
                                        label: dept,
                                        value: dept,
                                      }))}
                                    name="departmentsLeftGirls"
                                  />
                                </FormControl>
                                <FormDescription>
                                  All the departments that are in the left row,
                                  specifically for the girls
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="departmentsRightGirls"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Departments in Right Row (Girls)
                                </FormLabel>
                                <FormControl>
                                  <FancyMultiSelect
                                    onChange={(values) => {
                                      field.onChange(
                                        values.map(({ value }) => value),
                                      );
                                    }}
                                    data={form
                                      .getValues()
                                      .departments.map((dept) => ({
                                        label: dept,
                                        value: dept,
                                      }))}
                                    name="departmentsRightGirls"
                                  />
                                </FormControl>
                                <FormDescription>
                                  All the departments that are in the right row,
                                  specifically for the girls.
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          {form.getValues("years").length >= 3 ? (
                            <>
                              <FormField
                                control={form.control}
                                name="departmentsLeftSingleYear"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Departments Left Side order for Single
                                      Year{" "}
                                    </FormLabel>
                                    <FormControl>
                                      <FancyMultiSelect
                                        onChange={(values) => {
                                          field.onChange(
                                            values.map(({ value }) => value),
                                          );
                                        }}
                                        data={form
                                          .getValues()
                                          .departments.map((dept) => ({
                                            label: dept,
                                            value: dept,
                                          }))}
                                        name="departmentsLeftSingleYear"
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      The order of the departments
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="departmentsRightSingleYear"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Departments Right Side order for Single
                                      Year{" "}
                                    </FormLabel>
                                    <FormControl>
                                      <FancyMultiSelect
                                        onChange={(values) => {
                                          field.onChange(
                                            values.map(({ value }) => value),
                                          );
                                        }}
                                        data={form
                                          .getValues()
                                          .departments.map((dept) => ({
                                            label: dept,
                                            value: dept,
                                          }))}
                                        name="departmentsRightSingleYear"
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      The order of the departments
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 py-4">
                        <p>
                          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Departments Order and Flow
                          </span>
                        </p>

                        <p>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Only available if departments are seated together
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 py-4">
                      <p>
                        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Other Details
                        </span>
                      </p>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="secondColumnOptions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Second Column Options</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="capitalize">
                                    <SelectValue
                                      placeholder={"Select column options..."}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {Object.keys(SecondColumnOptions).map(
                                        (option) => (
                                          <SelectItem
                                            key={option}
                                            value={option}
                                          >
                                            {option}
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isCommonRoomStrength"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-2 leading-none">
                                <FormLabel>
                                  Make Room Strength Common?
                                </FormLabel>
                                <FormDescription>
                                  If you want to make the room strength common
                                  for all the rooms, check this box.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="minimumStudentsInRoom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Students in Room</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  value={field.value}
                                  onChange={field.onChange}
                                  autoComplete="on"
                                  defaultValue={60}
                                />
                              </FormControl>
                              <FormDescription>
                                Minimum number of students in a room.
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="randomizeEveryNRooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Randomize Every N Rooms</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  value={field.value}
                                  onChange={field.onChange}
                                  autoComplete="on"
                                  defaultValue={0}
                                />
                              </FormControl>
                              <FormDescription>
                                Randomize every N rooms.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        {form.getValues("template") !== "" ? (
                          <FormField
                            control={form.control}
                            name="roomsOrder"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rooms Order</FormLabel>
                                <FormControl>
                                  <FancyMultiSelect
                                    onChange={(values) => {
                                      field.onChange(
                                        values.map(({ value }) => value),
                                      );
                                      console.log(form.getValues("years"));
                                    }}
                                    name="roomsOrder"
                                    data={rooms}
                                  />
                                </FormControl>
                                <FormDescription>
                                  The order of the rooms
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Please select Template to set Rooms Order
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    // type="submit"
                    className="mt-4 w-full "
                    variant="default"
                    disabled={isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTimeTable(true);
                    }}
                    // onSubmit={form.handleSubmit(onSubmit)}
                  >
                    {isPending && (
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Next (TimeTable)
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
          <ScrollArea className="form-area overflow-scroll  ">
            <div className="p-8 ">
              {showTimeTable ? (
                <div>
                  <p>
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Time Table
                    </span>
                  </p>
                  <div className="mt-4 space-y-8 overflow-scroll">
                    {form.getValues("years").map((year) => (
                      <>
                        <p>
                          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {year} Year Timetable
                          </span>
                        </p>
                        <ScrollArea>
                          <Table
                            className="w-full border"
                            key={year}
                          >
                            {/* <TableCaption>Timetable for {year} Year</TableCaption> */}
                            <TableHeader>
                              <TableRow>
                                <TableCell>Departments/Dates</TableCell>
                                {generateDateRange(
                                  form.getValues("examDates.from"),
                                  form.getValues("examDates.to"),
                                ).map((date) => (
                                  <TableCell key={date.toISOString()}>
                                    {date.toLocaleDateString().slice(0, 10)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {form
                                .getValues("departments")
                                .map((department) => (
                                  <TableRow key={department}>
                                    <TableCell>{department}</TableCell>
                                    {generateDateRange(
                                      form.getValues("examDates.from"),
                                      form.getValues("examDates.to"),
                                    ).map((date) => (
                                      <TableCell key={date.toISOString()}>
                                        <Input
                                          type="text"
                                          value={
                                            timeTable?.[year]?.[department]?.[
                                              convertToISODate(
                                                date
                                                  .toLocaleString()
                                                  .slice(0, 10),
                                              ) ?? ""
                                            ] ?? ""
                                          }
                                          onChange={(event) => {
                                            setTimeTable({
                                              ...timeTable,
                                              [year]: {
                                                ...timeTable?.[year],
                                                [department]: {
                                                  ...timeTable?.[year]?.[
                                                    department
                                                  ],
                                                  [convertToISODate(
                                                    date
                                                      .toLocaleString()
                                                      .slice(0, 10),
                                                  ) ?? ""]: event.target.value,
                                                },
                                              },
                                            });
                                            console.log(timeTable);
                                          }}
                                        />
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      console.log("TIME", timeTable);
                      onSubmit(form.getValues(), timeTable);
                    }}
                  >
                    Create Exam
                  </Button>
                </div>
              ) : (
                <div className="w-full items-center justify-center ">
                  <p>
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Fill other details to display time table
                    </span>
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </form>
    </Form>
  );
};

export default CreateExamForm;
