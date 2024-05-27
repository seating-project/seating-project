"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import DownloadButton from "../client/DownloadButton";

type Props = {
  examId: number;
  dates: string[];
};

const Allotments = ({ examId, dates }: Props) => {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Allotments</CardTitle>
        <CardDescription>
          Students arrangement for each and every room
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex flex-row space-x-4">
            {dates.map((date) => {
              return (
                <Card key={date} className="w-96">
                  <CardHeader>
                    <CardTitle>Allotments for {date}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center  space-x-4">
                      <Link
                        href={`/exam/${examId}/allotment/${date}`}
                        className=""
                      >
                        <Button className="w-full">
                          <div className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <p>View</p>
                          </div>
                        </Button>
                      </Link>
                      <DownloadButton
                        links={[`/exam/${examId}/allotment/${date}`]}
                        title="Download"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Allotments;
