"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const ROTATING_TEXTS = [
  "Unit Tests...",
  "Edge Cases...",
  "Security Scenarios...",
  "Performance Checks..."
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [fadeState, setFadeState] = useState("opacity-100 translate-y-0");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const textInterval = setInterval(() => {
      // Fade out
      setFadeState("opacity-0 -translate-y-2");
      
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        // Fade in
        setFadeState("opacity-100 translate-y-0");
      }, 300);

    }, 2800);

    return () => clearInterval(textInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5 bg-slate-950"
    >
      {/* Interactive mouse follow glow */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`
        }}
      />

      {/* Floating Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -left-[30%] h-[120%] w-[120%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950" />
        
        {/* Spotlight blur */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-[130px] animate-float" />
        
        {/* Sub-spotlight */}
        <div className="absolute top-[5%] left-[40%] h-[200px] w-[400px] rounded-full bg-indigo-500/5 blur-[90px] animate-pulse-slow" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.08)] mb-6 transition-all duration-300 hover:border-indigo-500/40">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Supercharged by Gemini 1.5 Pro</span>
        </div>

        {/* Heading with spotlight background and rotating text */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-none">
          Generate{" "}
          <span className="relative inline-block">
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-30 blur-lg" />
            <span className="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Smart
            </span>
          </span>{" "}
          <div className="h-[1.2em] inline-flex items-center justify-center min-w-[280px]">
            <span className={`inline-block bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent transition-all duration-300 ${fadeState}`}>
              {ROTATING_TEXTS[textIndex]}
            </span>
          </div>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-8 max-w-2xl text-base text-slate-400 md:text-lg leading-relaxed">
          Automatically generate unit, integration, security and edge-case tests instantly.
        </p>

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <a
            href="#generator"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25 hover:scale-[1.02] focus:outline-none"
          >
            <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
            <span className="relative flex items-center gap-2">
              Start Generating
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
