"use client";

import React, { useState } from "react";
import { copyText } from "../utils/copyText";
import { Copy, Check, LucideIcon, ChevronDown, ChevronUp } from "lucide-react";

interface OutputCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  badgeColor: string;
}

// Estimate test case counts based on code structure occurrences
function estimateTestCount(code: string): number {
  if (!code) return 0;
  
  // Look for common testing constructs
  const testPatterns = /(test\(|it\(|describe\(|@Test|def\s+test_|void\s+test_|Scenario:|test\s+\"|assert|expect\()/gi;
  const matches = code.match(testPatterns);
  if (matches && matches.length > 0) {
    // Return count of matches but cap it at a sensible limit (e.g. 15) to remain realistic
    return Math.min(matches.length, 15);
  }
  
  // Fallback estimation using line structures
  const lines = code.split("\n").filter(l => l.trim().length > 0);
  if (lines.length > 5) {
    return Math.min(Math.ceil(lines.length / 8), 10);
  }
  return 0;
}

export default function OutputCard({ title, content, icon: Icon, badgeColor }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const testCount = estimateTestCount(content);

  const handleCopy = async () => {
    if (!content) return;
    const success = await copyText(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayContent = content || "No test cases generated for this category.";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/5 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/30 hover:bg-slate-900/30 hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]">
      {/* Top Gradient Border Highlight */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-500 group-hover:via-indigo-500/50" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${badgeColor} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
            {content && testCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mt-1">
                {testCount} tests detected
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleCopy}
          disabled={!content}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-white/10 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      {/* Content scroll container */}
      <div className="relative flex-1 rounded-xl bg-slate-950/40 border border-white/5 overflow-hidden transition-all duration-300">
        <div 
          className={`overflow-y-auto pr-1.5 custom-scrollbar text-left font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap select-text p-4 transition-all duration-300 ${
            isExpanded ? "max-h-[500px]" : "max-h-56"
          }`}
        >
          {displayContent}
        </div>

        {/* Gradient fade layer if collapsed */}
        {content && !isExpanded && (
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Expand/Collapse Trigger */}
      {content && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 hover:border-white/15 text-[11px] font-bold text-slate-400 hover:text-white transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Collapse code</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>Expand code</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
