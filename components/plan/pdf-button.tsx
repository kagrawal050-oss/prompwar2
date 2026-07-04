"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PdfButton({ targetId, filename }: { targetId: string; filename: string }) {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById(targetId);

      if (!element) return;

      const opt = {
        margin: 10,
        filename: `${filename.replace(/\s+/g, "-").toLowerCase()}-itinerary.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button className="print-button" onClick={handleExport} disabled={isExporting}>
      <Download className="w-4 h-4 mr-2" />
      {isExporting ? "Generating PDF..." : "Save as PDF"}
    </Button>
  );
}
