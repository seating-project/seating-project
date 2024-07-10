"use client";

import React from "react";
import { File, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  examId: number;
  examName: string;
  templateId: number;
  links: string[];
};

const DownloadZipButton = ({ examId, examName, templateId, links }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await Promise.resolve(
        await fetch("/api/download", {
          method: "POST",
          body: JSON.stringify({ examId, links, templateId }),
        }),
      );
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.setAttribute("download", `${examName}_Documents.zip`);
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download file");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload}>
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <File className=" mr-2 h-4 w-4 animate-pulse" />
      )}
      Download as ZIP
    </Button>
  );
};

export default DownloadZipButton;
