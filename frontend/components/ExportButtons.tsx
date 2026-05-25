"use client";

import React, { useState } from "react";
import { copyText } from "../utils/copyText";
import { downloadJson } from "../utils/downloadJson";
import { exportPDF } from "../utils/exportPDF";
import { TestResult } from "../types/testResult";
import { Copy, Check, Download, FileText } from "lucide-react";

interface ExportButtonsProps {
  data: TestResult | null;
}

export default function ExportButtons({ data }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopyAll = async () => {
    const fullText = `
=========================================
TESTGEN AI - GENERATED TEST SUITE
=========================================

1. UNIT TESTS
-----------------------------------------
${data.unitTests || "No unit tests generated."}


2. INTEGRATION TESTS
-----------------------------------------
${data.integrationTests || "No integration tests generated."}


3. EDGE CASES
-----------------------------------------
${data.edgeCases || "No edge cases generated."}


4. SECURITY TESTS
-----------------------------------------
${data.securityTests || "No security tests generated."}


5. PERFORMANCE TESTS
-----------------------------------------
${data.performanceTests || "No performance tests generated."}
`.trim();

    const success = await copyText(fullText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJson = () => {
    downloadJson(data);
  };

  const handleExportPdf = () => {
    exportPDF(data);
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 mb-6 animate-fade-in">
      <button
        onClick={handleCopyAll}
        className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-900/60 hover:text-white hover:border-indigo-500/30 active:scale-95 shadow-md"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">Copied All!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-indigo-400" />
            <span>Copy All</span>
          </>
        )}
      </button>

      <button
        onClick={handleDownloadJson}
        className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-900/60 hover:text-white hover:border-emerald-500/30 active:scale-95 shadow-md"
      >
        <Download className="h-4 w-4 text-emerald-400" />
        <span>Download JSON</span>
      </button>

      <button
        onClick={handleExportPdf}
        className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-900/60 hover:text-white hover:border-red-500/30 active:scale-95 shadow-md"
      >
        <FileText className="h-4 w-4 text-red-400" />
        <span>Export PDF</span>
      </button>
    </div>
  );
}
