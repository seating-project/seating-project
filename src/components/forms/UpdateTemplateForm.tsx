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
import type { RouterOutputs } from "@/trpc/shared";
import type { Option } from "@/types";

import { Checkbox } from "../ui/checkbox";
import { FancyMultiSelect } from "../ui/multi-select";
import { useToast } from "../ui/use-toast";

type Props = {
  buildings: Option[];
  rooms: Option[];
  logos: Option[];
  template: RouterOutputs["template"]["getTemplate"];
};

const UpdateTemplateForm = ({ buildings, rooms, logos, template }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [startTime, setStartTime] = useState(
    `${template?.startTime.getHours()}:${
      template?.startTime.getMinutes() !== 0
        ? (template?.startTime.getMinutes() ?? 1) < 10
          ? `0${template?.startTime.getMinutes()}`
          : `${template?.startTime.getMinutes()}`
        : "00"
    }`,
  );
  const [endTime, setEndTime] = useState(
    `${template?.endTime.getHours()}:${
      template?.endTime.getMinutes() !== 0
        ? (template?.endTime.getMinutes() ?? 1) < 10
          ? `0${template?.endTime.getMinutes()}`
          : `${template?.endTime.getMinutes()}`
        : "00"
    }`,
  );

  const { toast } = useToast();
  const utils = api.useUtils();
  const updateTemplate = api.template.updateTemplate.useMutation({
    onSuccess: async () => {
      toast({
        title: "Template updated",
        description: "Template updated successfully",
      });
      await utils.template.invalidate();
      router.refresh();
      router.push("/templates");
    },
  });

  // Sort Rooms
  rooms.sort((a, b) => a.label.localeCompare(b.label));

  //   console.log((template?.startTime.getMinutes() ?? 0 < 10) ? `0sdsd${template?.startTime.getMinutes()}` : template?.startTime.getMinutes())
  console.log(
    template?.startTime.getMinutes() !== 0
      ? (template?.startTime.getMinutes() ?? 1) < 10
        ? `0${template?.startTime.getMinutes()}`
        : `${template?.startTime.getMinutes()}`
      : "00",
    template?.Buildings
  );
  console.log(template?.endTime.getHours());
  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      isAlternateDepartmentSeated: template?.isAlternateDepartmentSeated,
      isBoysGirlsSeparate: template?.isBoysGirlsSeparate,
      isRandomizedDepartments: template?.isRandomizedDepartments,
      isSingleSeater: template?.isSingleSeater,
      name: template?.name,
      buildings: template?.Buildings.map((building) => building.name),
      rooms: template?.Rooms.map((room) => room.number),
      numberOfRows: template?.numberOfRows,
      numberOfColumns: template?.numberOfColumns,
      roomStrength: template?.roomStrength,
      startTime: template?.startTime,
      endTime: template?.endTime,
      logo: String(template?.Logo.id),
    },
  });

  function onSubmit(data: z.infer<typeof templateFormSchema>) {
    console.log(data.rooms);
    console.log(startTime, endTime);
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
      // }

      if (st > et) {
        toast({
          title: "Invalid Time",
          description: "Start time cannot be greater than end time",
          variant: "destructive",
        });
        return;
      }

      if (data.name === "") {
        toast({
          title: "Invalid Name",
          description: "Name cannot be empty",
          variant: "destructive",
        });
        return;
      }

      if (
        Number(data.numberOfRows) <= 0 ||
        Number.isNaN(Number(data.numberOfRows))
      ) {
        toast({
          title: "Invalid Rows",
          description: "Rows cannot be empty or zero",
          variant: "destructive",
        });
        return;
      }

      if (
        Number(data.numberOfColumns) <= 0 ||
        Number.isNaN(Number(data.numberOfColumns))
      ) {
        toast({
          title: "Invalid Columns",
          description: "Columns cannot be empty or zero",
          variant: "destructive",
        });
        return;
      }

      if (
        Number(data.roomStrength) <= 0 ||
        Number.isNaN(Number(data.roomStrength))
      ) {
        toast({
          title: "Invalid Room Strength",
          description: "Room Strength cannot be empty or zero",
          variant: "destructive",
        });
        return;
      }

      if (data.buildings.length === 0) {
        toast({
          title: "Invalid Buildings",
          description: "Buildings cannot be empty",
          variant: "destructive",
        });
        return;
      }

      if (data.rooms.length === 0) {
        toast({
          title: "Invalid Rooms",
          description: "Rooms cannot be empty",
          variant: "destructive",
        });
        return;
      }
      if (startTime === "00:00" || endTime === "00:00") {
        toast({
          title: "Invalid Time",
          description: "Start and End time cannot be empty",
          variant: "destructive",
        });
        return;
      }

      if (startTime === endTime) {
        toast({
          title: "Invalid Time",
          description: "Start and End time cannot be same",
          variant: "destructive",
        });
        return;
      }

      if (data.logo === "" || data.logo === undefined || data.logo === null) {
        toast({
          title: "Logo is required",
          description: "Logo is required for the template",
          variant: "destructive",
        });
        return;
      }

      console.log(st, et);
      await updateTemplate.mutateAsync({
        id: template?.id ?? 0,
        name: data.name,
        buildings: data.buildings,
        rooms: data.rooms,
        numberOfRows: Number(data.numberOfRows),
        numberOfColumns: Number(data.numberOfColumns),
        roomStrength: Number(data.roomStrength),
        isSingleSeater: data.isSingleSeater,
        isBoysGirlsSeparate: data.isBoysGirlsSeparate,
        isAlternateDepartmentSeated: data.isAlternateDepartmentSeated,
        isRandomizedDepartments: data.isRandomizedDepartments,
        startTime: st,
        endTime: et,
        logo: data.logo,
      });
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
                    onWheel={(e) =>
                      e.target instanceof HTMLElement && e.target.blur()
                    }
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
                    onWheel={(e) =>
                      e.target instanceof HTMLElement && e.target.blur()
                    }
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
                    onWheel={(e) =>
                      e.target instanceof HTMLElement && e.target.blur()
                    }
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
                      console.log(values);
                      field.onChange(values.map(({ value }) => value));
                    }}
                    name="rooms"
                    selectedData={form
                      .getValues("rooms")
                      .map((room) => ({
                        label: room,
                        value: room,
                      }))
                      .sort((a, b) => {
                        if (a.value < b.value) return -1;
                        if (a.value > b.value) return 1;
                        return 0;
                      })}
                    data={rooms}
                  />
                </FormControl>
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
                    selectedData={form
                      .getValues("buildings")
                      .map((building) => ({
                        label: building,
                        value: building,
                      }))
                      .sort((a, b) => {
                        if (a.value < b.value) return -1;
                        if (a.value > b.value) return 1;
                        return 0;
                      })}
                    data={buildings}
                  />
                </FormControl>
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
            Update Template
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTemplateForm;
