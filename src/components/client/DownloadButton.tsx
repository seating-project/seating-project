"use client";

import React from "react";
import { Download } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

type Props = {
  links: string[];
};

const DownloadButton = ({ links }: Props) => {
  const [downloading, setDownloading] = React.useState(false);
  const downloadPagesMutation = api.pdf.downloadPDFs.useMutation({
    onSettled: () => {
      toast({
        title: "Downloaded",
        description: "All pages have been downloaded",
      });
      setDownloading(false);
    },
    onMutate: () => {
      toast({
        title: "Downloading",
        description: "Downloading all pages",
      });
      setDownloading(true);
    },
  });

  async function handleDownloadClick() {
    await downloadPagesMutation.mutateAsync({ links: links });
  }

  return (
    <div className="my-2">
      <Button onClick={handleDownloadClick}>Download All</Button>
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

export default DownloadButton;
