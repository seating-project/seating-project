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
import type { RouterOutputs } from "@/trpc/shared";

import DownloadButton from "../client/DownloadButton";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  dates: string[];
};

const HallPlans = ({ exam, dates }: Props) => {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Hall Plans</CardTitle>
        <CardDescription>The hallplans for the exam</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex flex-row space-x-4">
            {/* link to hallpla route */}
            {!exam?.Template.isBoysGirlsSeparate
              ? dates.map((date) => {
                  return (
                    <Card className="w-96" key={date}>
                      <CardHeader>
                        <CardTitle>Hall Plan for all ({date})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center  space-x-4">
                          <Link
                            href={`/exam/${exam?.id}/hallplan/${date}`}
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
                            links={[`/exam/${exam?.id}/hallplan/${date}`]}
                            title="Download"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              : dates.map((date) => {
                  return (
                    <div key={date}>
                      <Card className="w-96">
                        <CardHeader>
                          <CardTitle>Hall Plan for Boys ({date})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center  space-x-4">
                            <Link
                              href={`/exam/${exam?.id}/hallplan/${date}/boys`}
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
                              links={[
                                `/exam/${exam.id}//hallplan/${date}/boys`,
                              ]}
                              title="Download"
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="w-96">
                        <CardHeader>
                          <CardTitle>Hall Plan for Girls ({date})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center  space-x-4">
                            <Link
                              href={`/exam/${exam?.id}/hallplan/${date}/girls`}
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
                              links={[
                                `/exam/${exam.id}/hallplan/${date}/girls`,
                              ]}
                              title="Download"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HallPlans;
