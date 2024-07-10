"use client";

import React, { useTransition } from "react";
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
import { roomFormSchema } from "@/lib/schema";
import { api } from "@/trpc/react";
import type { Option } from "@/types";

import { useToast } from "../ui/use-toast";

type Props = {
  buildings: Option[];
  blocks: Option[];
};

const RoomForm = ({ buildings, blocks }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const createTemplate = api.room.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Room created",
        description: "Room created successfully",
      });
      router.push("/rooms");
    },
  });

  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
  });

  function onSubmit(data: z.infer<typeof roomFormSchema>) {
    if (!data.number || data.number === "") {
      toast({
        title: "Error",
        description: "Room number is required",
        variant: "destructive",
      });
      return;
    }

    if (!data.floor || data.floor < 0 || Number.isNaN(Number(data.floor))) {
      toast({
        title: "Error",
        description: "Floor is required",
        variant: "destructive",
      });
      return;
    }

    if (
      !data.strength ||
      data.strength < 0 ||
      Number.isNaN(Number(data.strength))
    ) {
      toast({
        title: "Error",
        description: "Strength is required",
        variant: "destructive",
      });
      return;
    }

    if (!data.building || Number.isNaN(Number(data.building))) {
      toast({
        title: "Error",
        description: "Building is required",
        variant: "destructive",
      });
      return;
    }

    if (!data.block || Number.isNaN(Number(data.block))) {
      toast({
        title: "Error",
        description: "Block is required",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      await createTemplate.mutateAsync({
        blockId: Number(data.block),
        buildingId: Number(data.building),
        floor: Number(data.floor),
        strength: Number(data.strength),
        number: data.number,
      });
    });
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-row gap-x-8">
        <div className="flex w-1/2 flex-col space-y-4 ">
          <FormField
            name="number"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Room Number"
                    disabled={isPending}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  This is the number of the room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="floor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
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
                  This is the floor of the room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="strength"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strength</FormLabel>
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
                  This is the strength of the room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="block"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={"Select block..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {blocks.map((option) => (
                          <SelectItem key={option.label} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the block for the room.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="building"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={"Select building..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {buildings.map((option) => (
                          <SelectItem key={option.label} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the building for the room.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              onSubmit(form.getValues());
            }}
            className="w-full"
          >
            Create Room
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RoomForm;
