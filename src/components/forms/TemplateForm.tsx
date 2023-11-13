"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templateFormSchema } from "@/lib/schema";
import { api } from "@/trpc/react";
import type { Option } from "@/types";

import { Checkbox } from "../ui/checkbox";
import { FancyMultiSelect } from "../ui/multi-select";
import { useToast } from "../ui/use-toast";

type Props = {
  buildings: Option[];
  rooms: Option[];
  logos: Option[];
};

const TemplateForm = ({ buildings, rooms, logos }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const { toast } = useToast();
  const createTemplate = api.template.createTemplate.useMutation({
    onSuccess: () => {
      toast({
        title: "Template created",
        description: "Template created successfully",
      });
      router.push("/templates");
    },
  });

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      isAlternateDepartmentSeated: false,
      isBoysGirlsSeparate: false,
      isRandomizedDepartments: false,
      isSingleSeater: false,
      name: "",
      buildings: [],
      rooms: [],
      numberOfRows: 5,
      numberOfColumns: 6,
      roomStrength: 60,
    },
  });

  function onSubmit(data: z.infer<typeof templateFormSchema>) {
    startTransition(async () => {
      const st = new Date();
      const et = new Date();
      const [sh, sm] = startTime.split(":");
      const [eh, em] = endTime.split(":");
      st.setHours(Number(sh));
      st.setMinutes(Number(sm));
      st.setSeconds(0);
      st.setMilliseconds(0);
      et.setHours(Number(eh));
      et.setMinutes(Number(em));
      et.setSeconds(0);
      et.setMilliseconds(0);

      console.log(st, et);
      const formData = {
        name: data.name,
        buildings: data.buildings,
        rooms: data.rooms,
        numberOfRows: data.numberOfRows,
        numberOfColumns: data.numberOfColumns,
        roomStrength: data.roomStrength,
        isSingleSeater: data.isSingleSeater,
        isBoysGirlsSeparate: data.isBoysGirlsSeparate,
        isAlternateDepartmentSeated: data.isAlternateDepartmentSeated,
        isRandomizedDepartments: data.isRandomizedDepartments,
        startTime: st,
        endTime: et,
        logo: data.logo,
      };
      console.log(formData);
      await createTemplate.mutateAsync(formData);
    });
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-row gap-x-8">
        <div className="flex w-1/2 flex-col space-y-4 ">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Template Name"
                    disabled={isPending}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  This is the name of the template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="numberOfRows"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Rows</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="on"
                    defaultValue={5}
                  />
                </FormControl>
                <FormDescription>
                  This is the number of rows in the template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="numberOfColumns"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Columns</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="on"
                    defaultValue={6}
                  />
                </FormControl>
                <FormDescription>
                  This is the number of columns in the template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="roomStrength"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Strength</FormLabel>
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
                  This is the number of columns in the template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="rooms"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rooms</FormLabel>
                <FormControl>
                  <FancyMultiSelect
                    onChange={(values) => {
                      field.onChange(values.map(({ value }) => value));
                    }}
                    name="rooms"
                    data={rooms}
                  />
                </FormControl>
                <FormDescription>
                  This is the rooms needed for the exam
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="buildings"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buildings</FormLabel>
                <FormControl>
                  <FancyMultiSelect
                    onChange={(values) => {
                      field.onChange(values.map(({ value }) => value));
                    }}
                    name="buildings"
                    data={buildings}
                  />
                </FormControl>
                <FormDescription>
                  This is the buildings for the exam.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-1/2 flex-col space-y-4 ">
          <FormField
            control={form.control}
            name="isSingleSeater"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Is Single Seater?</FormLabel>
                  <FormDescription>
                    If you want to make every bench have only one student, check
                    this box.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isBoysGirlsSeparate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Make Boys/Girls Separation?</FormLabel>
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
            name="isAlternateDepartmentSeated"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Is alternate departments seated?</FormLabel>
                  <FormDescription>
                    If you want to make alternate departments seated, example
                    CSE-AIDS-CSE, then check this box.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRandomizedDepartments"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Randomize departments?</FormLabel>
                  <FormDescription>
                    If you want to randomize the departments order, check this
                    box.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                autoComplete="on"
              />
            </FormControl>
            <FormDescription>
              This is the start time for the exam.
            </FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel>End Time</FormLabel>
            <FormControl>
              <Input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                autoComplete="on"
              />
            </FormControl>
            <FormDescription>
              This is the end time for the exam.
            </FormDescription>
          </FormItem>

          <FormField
            name="logo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logos</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={"Select column options..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {logos.map((option) => (
                          <SelectItem key={option.label} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the logos for the exam.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              console.log("dasda");
              onSubmit(form.getValues());
            }}
            className="w-full"
          >
            Create Template
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateForm;
