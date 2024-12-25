"use client";

import React from "react";
import { Download, File } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

type Props = {
  title?: string;
  examId: number;
  date?: string;
  gender?: string;
};

const HallPlanDownloadButton = ({ title, examId, date, gender }: Props) => {
  const [downloading, setDownloading] = React.useState(false);

  const utils = api.useUtils();

  async function handleDownloadClick() {
    setDownloading(true);
    const exam = await utils.exam.getExamById.fetch({
      id: examId,
    });

    if (!exam) {
      return;
    }

    if (!date) {
      return;
    }

    const template = await utils.template.getTemplate.fetch({
      id: exam.templateId,
    });

    if (gender) {
      const response = await fetch(`/api/download/hallplan/gender`, {
        method: "POST",
        body: JSON.stringify({
          exam,
          template,
          date,
          gender,
        }),
      });

      const result = await response.blob();

      if (result.size > 0) {
        const url = window.URL.createObjectURL(result);

        // Create an anchor element to initiate the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `HallPlan_${exam.name}_${date}_${gender}.pdf`;
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      }
      setDownloading(false);
      toast({
        title: "Downloaded",
        description: `HallPlan_${exam.name}_${date}_${gender}.pdf`,
      });
    } else {
      const response = await fetch(`/api/download/hallplan`, {
        method: "POST",
        body: JSON.stringify({
          exam,
          template,
          date,
        }),
      });

      const result = await response.blob();

      if (result.size > 0) {
        const url = window.URL.createObjectURL(result);

        // Create an anchor element to initiate the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `HallPlan_${exam.name}_${date}.pdf`;
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      }
      setDownloading(false);
      toast({
        title: "Downloaded",
        description: `HallPlan_${exam.name}_${new Date(date).toLocaleDateString(
          "en-IN",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        )}.pdf has been downloaded`,
      });
    }
  }

  return (
    <div className="my-2">
      <Button onClick={handleDownloadClick}>
        <File className="mr-2 h-4 w-4" />
        {title ? title : "Download All"}
      </Button>
      <Alert className={cn(!downloading ? "hidden" : "")}>
        <Download className="h-4 w-4" />
        <AlertTitle>Downloading...</AlertTitle>
        <AlertDescription>
          {downloading
            ? "Downloading all pages"
            : "All pages have been downloaded"}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default HallPlanDownloadButton;
