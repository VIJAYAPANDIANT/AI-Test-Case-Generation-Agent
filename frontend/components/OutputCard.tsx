"use client";

import React, { useState } from "react";
import { copyText } from "../utils/copyText";
import { Copy, Check, LucideIcon } from "lucide-react";

interface OutputCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  badgeColor: string;
}

export default function OutputCard({ title, content, icon: Icon, badgeColor }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

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
    <div className="group relative flex flex-col rounded-2xl border border-white/5 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-slate-900/40 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)]">
      {/* Absolute top glowing bar for hover effect */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-500 group-hover:via-indigo-500/50" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${badgeColor} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
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
      <div className="relative flex-1 rounded-xl bg-slate-950/40 p-4 border border-white/5">
        <div className="max-h-72 overflow-y-auto pr-1.5 custom-scrollbar text-left font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap select-text">
          {displayContent}
        </div>
      </div>
    </div>
  );
}
