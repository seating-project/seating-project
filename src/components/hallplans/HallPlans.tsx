"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import HallPlanDownloadButton from "@/components/client/HallPlanDownloadButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { RouterOutputs } from "@/trpc/react";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  dates: string[];
};

const HallPlans = ({ exam, dates }: Props) => {
  if (!exam) {
    return (
      <div>
        <p>Exam not found</p>
      </div>
    );
  }
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
                        <CardTitle>
                          Hall Plan for all (
                          {new Date(date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          )
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
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
                          <HallPlanDownloadButton
                            examId={exam.id}
                            title="Download"
                            date={date}
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
                          <CardTitle>
                            Hall Plan for Boys (
                            {new Date(date).toLocaleDateString("en-IN", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            )
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4">
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
                            <HallPlanDownloadButton
                              examId={exam.id}
                              title="Download"
                              date={date}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="w-96">
                        <CardHeader>
                          <CardTitle>
                            Hall Plan for Girls (
                            {new Date(date).toLocaleDateString("en-IN", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            )
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4">
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
                            <HallPlanDownloadButton
                              examId={exam.id}
                              title="Download"
                              date={date}
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
