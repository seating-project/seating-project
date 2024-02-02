"use client";

import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Eye, File } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { RouterOutputs } from "@/trpc/shared";

import { Button } from "@/components/ui/button";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  dates: string[];
};

function createPDF() {
  const doc = new jsPDF();
  autoTable(doc, { html: "#sample-table" });
  doc.save("sample.pdf");
}

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
                          {/* <Link> */}
                          <Button className="" onClick={createPDF}>
                            <div className="flex items-center">
                              <File className=" mr-2 h-4 w-4" />
                              <p>Download </p>
                            </div>
                          </Button>
                          {/* </Link> */}
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
                            {/* <Link> */}
                            <Button className="" onClick={createPDF}>
                              <div className="flex items-center">
                                <File className=" mr-2 h-4 w-4" />
                                <p>Download </p>
                              </div>
                            </Button>
                            {/* </Link> */}
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
                            {/* <Link> */}
                            <Button className="" onClick={createPDF}>
                              <div className="flex items-center">
                                <File className=" mr-2 h-4 w-4" />
                                <p>Download </p>
                              </div>
                            </Button>
                            {/* </Link> */}
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
