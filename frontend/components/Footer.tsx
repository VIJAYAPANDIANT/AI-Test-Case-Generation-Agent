"use client";

import React from "react";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 py-12 text-center text-xs text-slate-500 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
            <Bot className="h-4.5 w-4.5" />
          </div>
          <span className="font-bold text-slate-200 tracking-wide">TestGen AI</span>
        </div>
        
        <p className="text-slate-500">
          © {new Date().getFullYear()} TestGen AI. Built for Developers & Hackathons. All rights reserved.
        </p>
        
        <div className="flex gap-4 text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
