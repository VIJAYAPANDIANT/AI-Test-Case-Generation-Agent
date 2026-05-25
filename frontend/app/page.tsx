"use client";

import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import InputArea from "../components/InputArea";
import Loading from "../components/Loading";
import ResultSection from "../components/ResultSection";
import Footer from "../components/Footer";
import { useGenerate } from "../hooks/useGenerate";
import { Cpu, Layers, ShieldAlert, AlertCircle, Zap, FileCode } from "lucide-react";

const FEATURES = [
  {
    title: "Unit Assertion Builder",
    description: "Generates high-coverage tests for individual methods, functions, and helper modules.",
    icon: Cpu,
    color: "text-indigo-400"
  },
  {
    title: "Integration Workflows",
    description: "Creates multi-step workflow simulations covering full API endpoints and database relations.",
    icon: Layers,
    color: "text-purple-400"
  },
  {
    title: "Vulnerability Scanning",
    description: "Verifies boundary safety, SQL injection, input validation errors, and cross-site scripting vulnerabilities.",
    icon: ShieldAlert,
    color: "text-red-400"
  },
  {
    title: "Edge Cases & Boundaries",
    description: "Tests negative integers, null pointers, empty data structures, and timeout conditions.",
    icon: AlertCircle,
    color: "text-pink-400"
  },
  {
    title: "Performance Assertions",
    description: "Checks payload sizes, execution delays, concurrency limits, and memory utilization.",
    icon: Zap,
    color: "text-amber-400"
  },
  {
    title: "Modern Frameworks Ready",
    description: "Generates standard assertions in Jest, Mocha, PyTest, Supertest, Cypress, and Playwright.",
    icon: FileCode,
    color: "text-emerald-400"
  }
];

export default function Home() {
  const {
    generate,
    isLoading,
    error,
    result
  } = useGenerate();

  const handleGenerate = async (prompt: string) => {
    try {
      await generate(prompt);
      
      // Automatically scroll to results on success
      setTimeout(() => {
        const resultsEl = document.getElementById("results");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      // Errors are caught and structured in state by the custom hook
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <Hero />

      {/* Stats Section with Scroll Animation */}
      <StatsSection />

      {/* Input Generator Form Container */}
      <div className="relative mt-16">
        <InputArea
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
      </div>

      {/* Loading AI thinking status sequence */}
      {isLoading && (
        <div className="mt-12 animate-fade-in">
          <Loading />
        </div>
      )}

      {/* Central Error Payload Boundary */}
      {error && (
        <div className="mx-auto w-full max-w-2xl px-4 mt-8 animate-fade-in">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center">
            <h4 className="text-sm font-bold text-red-400">Generation Failed</h4>
            <p className="mt-1 text-xs text-red-300/80">{error}</p>
          </div>
        </div>
      )}

      {/* Test Results Dashboard & Export Actions */}
      {!isLoading && <ResultSection data={result} />}

      {/* Features Showcase Section */}
      <section id="features" className="mx-auto max-w-6xl px-4 mt-32 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Complete Test Suite Coverage
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            TestGen AI covers your entire testing lifecycle by scanning inputs for vulnerabilities, structure, and edge conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/5 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-slate-900/20 hover:scale-[1.01]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors group-hover:bg-indigo-500/10 group-hover:text-white mb-4">
                  <Icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
