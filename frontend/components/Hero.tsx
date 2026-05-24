"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950" />
      
      {/* Decorative Blob 1 */}
      <div className="absolute top-[10%] left-[10%] -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px] animate-pulse-slow" />
      
      {/* Decorative Blob 2 */}
      <div className="absolute top-[20%] right-[10%] -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] animate-pulse-slow" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.15)] mb-6 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Supercharged by Gemini 1.5 Pro</span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-none">
          Generate{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Smart Test Cases
          </span>{" "}
          Using AI
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
          Automatically generate unit, integration, security and edge-case tests instantly.
        </p>

        {/* Action button trigger (scroll down or input focus) */}
        <div className="mt-8 flex justify-center">
          <a
            href="#generator"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25 hover:scale-[1.02] focus:outline-none"
          >
            Start Generating
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
