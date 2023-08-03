"use client";

import React, { useEffect, useState, useTransition } from "react";
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
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Data, FancyMultiSelect } from "@/components/ui/multi-select";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SecondColumnOptions } from "@prisma/client";
import { type Option, type Template } from "@/types";
import { examFormSchema } from "@/lib/schema";
import { api } from "@/trpc/client";
import { toast } from "../ui/use-toast";

type Props = {
  departments: Option[];
  templates: Option[];
  years: Option[];
  rooms: Option[];
  templateData: Template[];
};

const CreateExamForm = ({
  departments,
  templates,
  years,
  templateData,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [rooms, setRooms] = useState<Data[]>([]);

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
            }) as Data[]
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, form.getValues("template")]
  );

  function onSubmit(values: z.infer<typeof examFormSchema>) {
    startTransition(async () => {
      console.log(values);
      const createExam = await api.exam.createExam.mutate({
        name: values.name,
        template: values.template,
        departments: values.departments,
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
      });

      createExam ? toast({
        title: "Exam Created",
        description: "Exam has been created successfully",
        
      }) : toast({
        title: "Exam Creation Failed",
        description: "Exam could not be created",
      })

      form.reset();
      
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-x-8 text-black dark:text-white"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                  <FormDescription>This is the exam name</FormDescription>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={"Select Template..."} />
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
                  <FormDescription>This is the exam template</FormDescription>
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
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
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
                        field.onChange(values.map(({ value }) => value));
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
                        field.onChange(values.map(({ value }) => value));
                      }}
                      data={years}
                      name="years"
                    />
                  </FormControl>
                  <FormDescription>This is the exam years</FormDescription>
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
                        Allows students from different years to be in the same
                        bench. Useful for exams that have different years in the
                        same exam
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
                        Are different departments students seated together?
                      </FormLabel>
                      <FormDescription>
                        Allows students from different departments to be in the
                        same bench. Useful for exams that have different
                        departments in the same exam
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
                        This will allow you to add Ph.D students to the exam
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
                        This will allow you to add M.E. students to the exam
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
                      <FormLabel>Departments in Left Row (Boys)</FormLabel>
                      <FormControl>
                        <FancyMultiSelect
                          onChange={(values) => {
                            field.onChange(values.map(({ value }) => value));
                          }}
                          data={form.getValues("departments").map((dept) => ({
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
                      <FormLabel>Departments in Right Row (Boys)</FormLabel>
                      <FormControl>
                        <FancyMultiSelect
                          onChange={(values) => {
                            field.onChange(values.map(({ value }) => value));
                          }}
                          data={form.getValues().departments.map((dept) => ({
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
                      <FormLabel>Departments in Left Row (Girls)</FormLabel>
                      <FormControl>
                        <FancyMultiSelect
                          onChange={(values) => {
                            field.onChange(values.map(({ value }) => value));
                          }}
                          data={form.getValues().departments.map((dept) => ({
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
                      <FormLabel>Departments in Right Row (Girls)</FormLabel>
                      <FormControl>
                        <FancyMultiSelect
                          onChange={(values) => {
                            field.onChange(values.map(({ value }) => value));
                          }}
                          data={form.getValues().departments.map((dept) => ({
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
                            {Object.keys(SecondColumnOptions).map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
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
                      <FormLabel>Make Room Strength Common?</FormLabel>
                      <FormDescription>
                        If you want to make the room strength common for all the
                        rooms, check this box.
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
                    <FormDescription>Randomize every N rooms.</FormDescription>
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
                            field.onChange(values.map(({ value }) => value));
                          }}
                          name="roomsOrder"
                          data={rooms}
                        />
                      </FormControl>
                      <FormDescription>The order of the rooms</FormDescription>
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
          type="submit"
          className="mt-4 w-full "
          variant="default"
          disabled={isPending}
          // onClick={() => {
          // console.log(form.getValues());
          // }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateExamForm;
